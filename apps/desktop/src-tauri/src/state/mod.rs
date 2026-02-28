// apps/desktop/src-tauri/src/state/mod.rs

use std::sync::Arc;
use tokio::sync::Mutex;
use crate::mcp::MCPBridge;
use crate::config::ConfigManager;

pub struct AppState {
    pub mcp: MCPBridge,
    pub config: ConfigManager,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            mcp: MCPBridge::instance(),
            config: ConfigManager::new(),
        }
    }
}
