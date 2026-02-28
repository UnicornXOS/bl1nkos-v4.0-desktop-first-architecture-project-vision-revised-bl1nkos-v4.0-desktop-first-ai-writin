// apps/desktop/src-tauri/src/commands/config.rs

use tauri::command;
use serde_json::Value;
use std::path::PathBuf;
use tokio::fs;

#[command]
pub async fn get_config(key: String) -> Result<Value, String> {
    let config_path = get_config_path();
    
    if !config_path.exists() {
        return Ok(Value::Null);
    }
    
    let content = fs::read_to_string(&config_path)
        .await
        .map_err(|e| e.to_string())?;

    let config: Value = serde_json::from_str(&content)
        .map_err(|e| e.to_string())?;

    Ok(config.get(&key).cloned().unwrap_or(Value::Null))
}

#[command]
pub async fn save_config(key: String, value: Value) -> Result<(), String> {
    let config_path = get_config_path();
    
    // Ensure config directory exists
    if let Some(parent) = config_path.parent() {
        fs::create_dir_all(parent)
            .await
            .map_err(|e| e.to_string())?;
    }
    
    let mut config: Value = if config_path.exists() {
        let content = fs::read_to_string(&config_path)
            .await
            .map_err(|e| e.to_string())?;
        serde_json::from_str(&content)
            .map_err(|e| e.to_string())?
    } else {
        Value::Object(Default::default())
    };

    config[&key] = value;

    fs::write(&config_path, serde_json::to_string_pretty(&config).unwrap())
        .await
        .map_err(|e| e.to_string())
}

fn get_config_path() -> PathBuf {
    let home = dirs::home_dir().unwrap_or_default();
    home.join(".bl1nk/config.json")
}
