import {adapter as svelte, svelteDefaultHeuristic} from '@wuchale/svelte'
import {defaultHeuristic, defineConfig} from 'wuchale'
import {adapter as vanilla} from 'wuchale/adapter-vanilla'

const is_translatable_token = msg => {
  const raw = Array.isArray(msg.msgStr) ? msg.msgStr[0] : msg.msgStr
  return typeof raw === 'string' && /\p{sc=Arabic}/u.test(raw)
}

export default defineConfig({
  locales: ['ar', 'en'],
  logLevel: 'warn',
  adapters: {
    main: svelte({
      heuristic: msg => is_translatable_token(msg) && svelteDefaultHeuristic(msg),
      files: ['src/**/*.svelte'],
      loader: 'svelte',
    }),
    js: vanilla({
      heuristic: msg => is_translatable_token(msg) && defaultHeuristic(msg),
      files: ['src/lib/format.js', 'src/lib/i18n.js'],
      loader: 'vite',
    })
  }
})
