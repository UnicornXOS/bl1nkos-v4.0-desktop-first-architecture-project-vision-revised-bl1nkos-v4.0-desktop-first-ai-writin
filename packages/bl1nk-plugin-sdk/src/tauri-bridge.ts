// packages/bl1nk-plugin-sdk/src/tauri-bridge.ts

import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';

export class TauriBridge {
  static async callTool(server: string, tool: string, params: unknown) {
    return invoke('mcp_call_tool', { server, tool, params });
  }

  static async listTools(server: string) {
    return invoke('mcp_list_tools', { server });
  }

  static async readFile(path: string) {
    return invoke('read_file', { path });
  }

  static async writeFile(path: string, content: string) {
    return invoke('write_file', { path, content });
  }

  static async listFiles(path: string) {
    return invoke('list_files', { path });
  }

  static async executeTerminal(cmd: string) {
    return invoke('terminal_execute', { cmd });
  }

  static async getConfig(key: string) {
    return invoke('get_config', { key });
  }

  static async saveConfig(key: string, value: unknown) {
    return invoke('save_config', { key, value });
  }
}
