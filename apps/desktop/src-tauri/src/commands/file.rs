// apps/desktop/src-tauri/src/commands/file.rs

use tauri::command;
use tokio::fs;

#[command]
pub async fn read_file(path: String) -> Result<String, String> {
    fs::read_to_string(&path)
        .await
        .map_err(|e| e.to_string())
}

#[command]
pub async fn write_file(path: String, content: String) -> Result<(), String> {
    fs::write(&path, content)
        .await
        .map_err(|e| e.to_string())
}

#[command]
pub async fn list_files(path: String) -> Result<Vec<String>, String> {
    let mut entries = fs::read_dir(&path)
        .await
        .map_err(|e| e.to_string())?;

    let mut files = Vec::new();
    while let Some(entry) = entries.next_entry().await.map_err(|e| e.to_string())? {
        files.push(
            entry
                .path()
                .to_string_lossy()
                .to_string()
        );
    }

    Ok(files)
}
