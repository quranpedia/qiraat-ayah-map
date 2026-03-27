import path from 'node:path'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

import tsconfig from './tsconfig.json' with { type: 'json' }

function normalize_base(value) {
  if (!value || value === '.' || value === './') return '/'

  let base = value.trim()

  if (!base.startsWith('/')) base = '/' + base
  if (!base.endsWith('/')) base += '/'

  return base.replace(/\/{2,}/g, '/')
}

export default defineConfig({
  base: normalize_base(process.env.BASE_PATH),
  resolve: {
    alias: Object.fromEntries(
      Object.entries(tsconfig.compilerOptions.paths).map(([key, value]) => [
        key.replace('/*', ''),
        path.resolve(value[0].replace('/*', ''))
      ])
    )
  },
  css: {
    transformer: 'lightningcss'
  },
  plugins: [
    tailwindcss(),
    svelte({
      onwarn(warning, handler) {
        const ignored = [
          'a11y_click_events_have_key_events',
          'a11y_no_noninteractive_element_interactions',
          'a11y_no_static_element_interactions'
        ]

        if (!ignored.includes(warning.code)) {
          handler(warning)
        }
      }
    })
  ]
})
