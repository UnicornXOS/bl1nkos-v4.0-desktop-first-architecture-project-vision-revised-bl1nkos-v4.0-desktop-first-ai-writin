// apps/desktop/src-web/lib/tauri-bridge.ts

import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';

export class TauriBridge {
  static async callTool(server: string, tool: string, params: unknown) {
    return invoke('mcp_call_tool', {
      server,
      tool,
      params,
    });
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

  static async executeTerminal(cmd: string, args: string[] = []) {
    return invoke('terminal_execute', { cmd, args });
  }

  static async loadPlugin(pluginId: string, pluginPath: string) {
    return invoke('plugin_load', { plugin_id: pluginId, plugin_path: pluginPath });
  }

  static async unloadPlugin(pluginId: string) {
    return invoke('plugin_unload', { plugin_id: pluginId });
  }

  static async getConfig(key: string) {
    return invoke('get_config', { key });
  }

  static async saveConfig(key: string, value: unknown) {
    return invoke('save_config', { key, value });
  }

  static async onShowOverlay(callback: (payload: unknown) => void) {
    await listen('show-overlay', (event) => {
      callback(event.payload);
    });
  }

  static async onShowCommandPalette(callback: (payload: unknown) => void) {
    await listen('show-command-palette', (event) => {
      callback(event.payload);
    });
  }
}
