import type { Component } from 'vue'

export interface DemoItem {
  id: string
  title: string | Record<string, string>
  description?: string | Record<string, string>
  component: Component
  code: string
}
