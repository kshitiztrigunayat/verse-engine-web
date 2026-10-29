export type SceneStatus = "Ready" | "Processing";
export interface Scene { id: string; name: string; source: string; status: SceneStatus; views: number; sessions: number; watch: number; date: string }
export interface Session { when: string; device: string; city: string; watch: string }
export interface Webhook { id: string; name: string; url: string; events: string[]; status: "Active" | "Paused" | "Failing"; views: number; sessions: number; watch: string; ok: string }
export interface ApiKey { id: string; name: string; tail: string; created: string; used: string }
export interface Plugin { id: string; name: string; initial: string; version: string; connected: boolean }
