// apps/desktop/src-tauri/src/config/mod.rs

use std::path::PathBuf;
use serde_json::Value;

pub struct ConfigManager {
    config_path: PathBuf,
}

impl ConfigManager {
    pub fn new() -> Self {
        let home = dirs::home_dir().unwrap_or_default();
        let config_path = home.join(".bl1nk/config.json");
        Self { config_path }
    }

    pub fn config_path(&self) -> &PathBuf {
        &self.config_path
    }

    pub async fn get(&self, key: &str) -> Result<Value, Box<dyn std::error::Error + Send + Sync>> {
        if !self.config_path.exists() {
            return Ok(Value::Null);
        }

        let content = tokio::fs::read_to_string(&self.config_path).await?;
        let config: Value = serde_json::from_str(&content)?;

        Ok(config.get(key).cloned().unwrap_or(Value::Null))
    }

    pub async fn set(&self, key: &str, value: Value) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
        if let Some(parent) = self.config_path.parent() {
            tokio::fs::create_dir_all(parent).await?;
        }

        let mut config: Value = if self.config_path.exists() {
            let content = tokio::fs::read_to_string(&self.config_path).await?;
            serde_json::from_str(&content)?
        } else {
            Value::Object(Default::default())
        };

        config[key] = value;

        let content = serde_json::to_string_pretty(&config)?;
        tokio::fs::write(&self.config_path, content).await?;

        Ok(())
    }
}
