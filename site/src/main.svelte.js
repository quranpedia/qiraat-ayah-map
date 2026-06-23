import './lib/preinit.js'
import './css/tailwind.css'
import './css/base.css'

import Navgo from 'navgo'
import { mount } from 'svelte'

import { init_i18n } from '$lib/i18n.js'

import * as Diagnostics from '~/routes/DeveloperDiagnostics.svelte'
import * as Developer from '~/routes/Developer.svelte'
import * as AyahCounts from '~/routes/AyahCounts.svelte'
import * as Doc from '~/routes/Doc.svelte'
import * as Docs from '~/routes/Docs.svelte'
import * as Explorer from '~/routes/Explorer.svelte'
import * as Home from '~/routes/Home.svelte'
import * as Mushaf from '~/routes/Mushaf.svelte'
import * as NotFound from '~/routes/NotFound.svelte'
import * as Project from '~/routes/Project.svelte'
import * as Surah from '~/routes/Surah.svelte'
import * as Madhhab from '~/routes/Madhhab.svelte'

import App from './App.svelte'

const routes = [
  ['/', Home],
  ['/mushaf', Mushaf],
  ['/developer/diagnostics', Diagnostics],
  ['/compare', Diagnostics],
  ['/developer', Developer],
  ['/ayah-counts', AyahCounts],
  ['/docs', Docs],
  ['/docs/:slug', Doc],
  ['/explorer', Explorer],
  ['/project', Project],
  ['/madhhabs/:madhhab', Madhhab],
  ['/systems/:madhhab', Madhhab],
  ['/surahs', Mushaf],
  ['/surahs/:surah', Surah],
  [/^.*$/, NotFound]
]

const props = $state({
  Component: Home.default,
  route_params: {},
  route_hash: window.location.hash || '',
  route_query: Object.fromEntries(new URLSearchParams(window.location.search))
})

const router = new Navgo(routes, {
  base: import.meta.env.BASE_URL || '/',
  after_navigate(nav) {
    props.Component = nav.to.route?.[1]?.default || NotFound.default
    props.route_params = nav.to.params || {}
    props.route_hash = window.location.hash || ''
    props.route_query = Object.fromEntries(new URLSearchParams(window.location.search))
  }
})

init_i18n()
  .catch(error => {
    console.error('Failed to initialize i18n:', error)
  })
  .then(() => router.init())
  .then(() => {
    mount(App, {
      target: document.body,
      props
    })
  })
