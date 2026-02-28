// packages/bl1nk-types/src/index.ts

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Document types
export interface Document {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Plugin types
export interface Plugin {
  id: string;
  name: string;
  version: string;
  enabled: boolean;
  installedAt: Date;
}

// MCP types
export interface MCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface MCPServer {
  id: string;
  name: string;
  endpoint: string;
  tools: MCPTool[];
  connected: boolean;
}

// Event types
export interface AppEvent {
  type: string;
  payload: unknown;
  timestamp: Date;
}

// Settings types
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  fontSize: number;
  fontFamily: string;
  autoSave: boolean;
  autoSaveInterval: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Calendar types
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  reminder?: Date;
  description?: string;
}

// OAuth types
export interface OAuthToken {
  provider: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt: Date;
}
