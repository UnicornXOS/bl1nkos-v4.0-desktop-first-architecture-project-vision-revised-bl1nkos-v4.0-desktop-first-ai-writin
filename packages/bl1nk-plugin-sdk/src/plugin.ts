// packages/bl1nk-plugin-sdk/src/plugin.ts

import { TauriBridge } from './tauri-bridge';
import type { PluginManifest, PluginContext } from './types';

export class BlinkPlugin {
  private manifest: PluginManifest;
  private context: PluginContext;

  constructor(manifest: PluginManifest) {
    this.manifest = manifest;
    this.context = {
      id: manifest.id,
      name: manifest.name,
      version: manifest.version,
      bridge: TauriBridge,
    };
  }

  async initialize() {
    console.log(`Initializing plugin: ${this.manifest.name}`);
  }

  async activate() {
    console.log(`Activating plugin: ${this.manifest.name}`);
  }

  async deactivate() {
    console.log(`Deactivating plugin: ${this.manifest.name}`);
  }

  getContext(): PluginContext {
    return this.context;
  }

  getManifest(): PluginManifest {
    return this.manifest;
  }
}

export function definePlugin(manifest: PluginManifest) {
  return new BlinkPlugin(manifest);
}
