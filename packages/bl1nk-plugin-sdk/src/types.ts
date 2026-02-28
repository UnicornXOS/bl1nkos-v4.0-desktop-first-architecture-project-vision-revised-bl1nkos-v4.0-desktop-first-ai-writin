// packages/bl1nk-plugin-sdk/src/types.ts

import type { TauriBridge } from './tauri-bridge';

export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: string;
  license?: string;
  icon?: string;
  repository?: string;
  
  // Entry points
  main?: string;
  ui?: string;
  
  // Permissions
  permissions?: string[];
  
  // Dependencies
  dependencies?: Record<string, string>;
  
  // Activation events
  activationEvents?: string[];
  
  // Contributes
  contributes?: {
    commands?: PluginCommand[];
    views?: PluginView[];
    settings?: PluginSetting[];
    mcpServers?: MCPServerConfig[];
  };
}

export interface PluginCommand {
  id: string;
  title: string;
  description?: string;
  category?: string;
  keybinding?: string;
  when?: string;
}

export interface PluginView {
  id: string;
  name: string;
  type: 'sidebar' | 'panel' | 'modal';
  icon?: string;
  title?: string;
}

export interface PluginSetting {
  id: string;
  type: 'string' | 'number' | 'boolean' | 'select';
  default?: unknown;
  description?: string;
}

export interface MCPServerConfig {
  id: string;
  name: string;
  endpoint: string;
  tools: string[];
}

export interface PluginContext {
  id: string;
  name: string;
  version: string;
  bridge: typeof TauriBridge;
}

export interface PluginAPI {
  commands: {
    executeCommand(id: string, ...args: unknown[]): Promise<unknown>;
    registerCommand(id: string, handler: (...args: unknown[]) => Promise<unknown>): void;
  };
  views: {
    registerView(view: PluginView): void;
    showView(id: string): void;
    hideView(id: string): void;
  };
  settings: {
    get(key: string): Promise<unknown>;
    set(key: string, value: unknown): Promise<void>;
    onDidChange(callback: (key: string, value: unknown) => void): void;
  };
  mcp: {
    callTool(server: string, tool: string, params: unknown): Promise<unknown>;
    listTools(server: string): Promise<unknown[]>;
  };
  events: {
    on(event: string, callback: (...args: unknown[]) => void): void;
    emit(event: string, ...args: unknown[]): void;
  };
}
