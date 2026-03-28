import './css/tailwind.css'
import './css/base.css'

import Navgo from 'navgo'
import { mount } from 'svelte'

import * as Compare from '~/routes/Compare.svelte'
import * as Developer from '~/routes/Developer.svelte'
import * as Explorer from '~/routes/Explorer.svelte'
import * as Home from '~/routes/Home.svelte'
import * as NotFound from '~/routes/NotFound.svelte'
import * as Project from '~/routes/Project.svelte'
import * as ProjectArabic from '~/routes/ProjectArabic.svelte'
import * as Surah from '~/routes/Surah.svelte'
import * as Surahs from '~/routes/Surahs.svelte'
import * as System from '~/routes/System.svelte'

import App from './App.svelte'

const routes = [
  ['/', Home],
  ['/compare', Compare],
  ['/developer', Developer],
  ['/explorer', Explorer],
  ['/project/ar', ProjectArabic],
  ['/project', Project],
  ['/systems/:system', System],
  ['/surahs', Surahs],
  ['/surahs/:surah', Surah],
  [/^.*$/, NotFound]
]

const props = $state({
  Component: Home.default,
  route_params: {}
})

const router = new Navgo(routes, {
  base: import.meta.env.BASE_URL || '/',
  after_navigate(nav) {
    props.Component = nav.to.route?.[1]?.default || NotFound.default
    props.route_params = nav.to.params || {}
  }
})

router.init().then(() => {
  mount(App, {
    target: document.body,
    props
  })
})
