// apps/desktop/src-tauri/src/commands/mcp.rs

use tauri::command;
use serde_json::{json, Value};
use crate::mcp::MCPBridge;

#[command]
pub async fn mcp_call_tool(
    server: String,
    tool: String,
    params: Value,
) -> Result<Value, String> {
    let bridge = MCPBridge::instance();
    bridge
        .call_tool(&server, &tool, params)
        .await
        .map_err(|e| e.to_string())
}

#[command]
pub async fn mcp_list_tools(server: String) -> Result<Vec<Value>, String> {
    let bridge = MCPBridge::instance();
    bridge
        .list_tools(&server)
        .await
        .map_err(|e| e.to_string())
}
