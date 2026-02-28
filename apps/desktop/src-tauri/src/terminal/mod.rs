// apps/desktop/src-tauri/src/terminal/mod.rs

use std::process::Command;

pub struct TerminalExecutor;

impl TerminalExecutor {
    pub fn new() -> Self {
        Self
    }

    pub fn execute(&self, cmd: &str, args: &[String]) -> Result<String, String> {
        let output = if cfg!(target_os = "windows") {
            Command::new("cmd")
                .args(&["/C", cmd])
                .output()
                .map_err(|e| e.to_string())?
        } else {
            Command::new("sh")
                .arg("-c")
                .arg(cmd)
                .output()
                .map_err(|e| e.to_string())?
        };

        let stdout = String::from_utf8_lossy(&output.stdout).to_string();
        let stderr = String::from_utf8_lossy(&output.stderr).to_string();

        if output.status.success() {
            Ok(stdout)
        } else {
            Err(stderr)
        }
    }
}
