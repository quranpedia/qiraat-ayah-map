import path from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import {wuchale} from 'wuchale/vite'

import tsconfig from './tsconfig.json' with { type: 'json' }

function normalize_base(value) {
  if (!value || value === '.' || value === './') return '/'

  let base = value.trim()

  if (!base.startsWith('/')) base = '/' + base
  if (!base.endsWith('/')) base += '/'

  return base.replace(/\/{2,}/g, '/')
}

function merge_assets_into_index_html(base) {
  const index_path = path.resolve('dist', 'index.html')
  let html = readFileSync(index_path, 'utf8')
  const to_dist_path = asset_url => {
    let file = asset_url.split(/[?#]/, 1)[0]
    if (base !== '/' && file.startsWith(base)) file = file.slice(base.length)
    return path.resolve('dist', file.replace(/^\.?\//, ''))
  }

  const css_match = html.match(/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/)
  if (css_match) {
    const css = readFileSync(to_dist_path(css_match[1]), 'utf8')
    html = html.replace(css_match[0], () => `<style>\n${css}\n</style>`)
  }

  const js_match = html.match(/<script\b[^>]*type=["']module["'][^>]*src=["']([^"']+)["'][^>]*>\s*<\/script>/)
  if (js_match) {
    const js = readFileSync(to_dist_path(js_match[1]), 'utf8').replace(/<\/script/gi, '<\\/script')
    html = html.replace(js_match[0], () => `<script type="module">\n${js}\n</script>`)
  }

  writeFileSync(index_path, html)
}

const base = normalize_base(process.env.BASE_PATH)

export default defineConfig({
  base,
  resolve: {
    alias: [
      ...Object.entries(tsconfig.compilerOptions.paths).map(([key, value]) => ({
        find: key.replace('/*', ''),
        replacement: path.resolve(value[0].replace('/*', ''))
      })),
      {
        find: /\.\/\.wuchale\/main\.proxy\.js$/,
        replacement: path.resolve('src/locales/.wuchale/main.proxy.sync.js')
      }
    ]
  },
  css: {
    transformer: 'lightningcss'
  },
  plugins: [
    tailwindcss(),
    wuchale(),
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
    }),
    {
      name: 'merge-assets-into-index-html',
      apply: 'build',
      writeBundle() {
        merge_assets_into_index_html(base)
      }
    }
  ]
})
