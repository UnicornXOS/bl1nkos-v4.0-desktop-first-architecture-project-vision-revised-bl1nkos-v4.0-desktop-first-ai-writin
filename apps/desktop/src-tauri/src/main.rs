// apps/desktop/src-tauri/src/main.rs

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;
mod mcp;
mod terminal;
mod config;
mod state;

use tauri::{Manager, GlobalShortcutManager};
use std::sync::Arc;
use tokio::sync::Mutex;

#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}

// Health check response
#[derive(serde::Serialize)]
struct HealthResponse {
    status: String,
    version: String,
    timestamp: String,
}

// Health check endpoint
#[rocket::get("/health")]
fn health_check() -> rocket::serde::json::Json<HealthResponse> {
    rocket::serde::json::Json(HealthResponse {
        status: "ok".to_string(),
        version: "4.0.0".to_string(),
        timestamp: chrono::Utc::now().to_rfc3339(),
    })
}

// CORS rocket config
#[rocket::launch]
fn rocket_launch() -> _ {
    rocket::build()
        .mount("/", rocket::routes![health_check])
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Setup global state
            let state = state::AppState::new();
            app.manage(state);

            // Register global shortcuts
            let mut shortcut_manager = app.global_shortcut_manager();
            
            // Ctrl+Shift+Space for overlay
            shortcut_manager
                .register("ctrl+shift+space", {
                    let app_handle = app.app_handle();
                    move || {
                        app_handle.emit_all("show-overlay", Payload {
                            args: vec![],
                            cwd: std::env::current_dir()
                                .unwrap_or_default()
                                .to_string_lossy()
                                .to_string(),
                        }).ok();
                    }
                })
                .expect("Failed to register shortcut");

            // Cmd+K for command palette
            shortcut_manager
                .register("cmd+k", {
                    let app_handle = app.app_handle();
                    move || {
                        app_handle.emit_all("show-command-palette", Payload {
                            args: vec![],
                            cwd: std::env::current_dir()
                                .unwrap_or_default()
                                .to_string_lossy()
                                .to_string(),
                        }).ok();
                    }
                })
                .expect("Failed to register shortcut");

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::get_config,
            commands::save_config,
            commands::read_file,
            commands::write_file,
            commands::list_files,
            commands::mcp_call_tool,
            commands::mcp_list_tools,
            commands::terminal_execute,
            commands::plugin_load,
            commands::plugin_unload,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
