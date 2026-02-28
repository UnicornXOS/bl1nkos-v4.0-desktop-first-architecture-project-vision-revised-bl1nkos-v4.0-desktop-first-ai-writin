// apps/desktop/src-tauri/src/commands/plugin.rs

use tauri::command;
use serde_json::Value;

#[command]
pub async fn plugin_load(plugin_id: String, plugin_path: String) -> Result<Value, String> {
    // Load plugin from path
    // Parse bl1nk-extension.json
    // Initialize plugin
    tracing::info!("Loading plugin {} from {}", plugin_id, plugin_path);
    Ok(serde_json::json!({
        "id": plugin_id,
        "path": plugin_path,
        "status": "loaded"
    }))
}

#[command]
pub async fn plugin_unload(plugin_id: String) -> Result<(), String> {
    // Unload plugin
    // Cleanup resources
    tracing::info!("Unloading plugin {}", plugin_id);
    Ok(())
}
