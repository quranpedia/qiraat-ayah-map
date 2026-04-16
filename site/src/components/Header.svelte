<script>
import {
  BookOpenCheckIcon,
  CompassIcon,
  FilesIcon,
  GlobeIcon,
  LibraryBigIcon,
  MilestoneIcon,
  PanelsTopLeftIcon,
  SearchIcon
} from '@lucide/svelte'

import { compact_number, summary } from '$lib/dataset.svelte.js'
import { get_current_language, set_language } from '$lib/i18n.js'

const { route } = window.navgo

// @wc-ignore
const BRAND_TITLE_AR = 'أطلس عدِّ الآي'
const BRAND_TITLE_EN = 'Qiraat Ayah Atlas'

function get_nav_items() {
  return [
    { href: '/', label: 'الأطلس', icon: CompassIcon, matches: path => path === '/' },
    { href: '/surahs', label: 'السور', icon: LibraryBigIcon, matches: path => path === '/surahs' || path.startsWith('/surahs/') },
    { href: '/compare', label: 'المقارنة', icon: MilestoneIcon, matches: path => path === '/compare' },
    { href: '/explorer', label: 'المستكشف', icon: SearchIcon, matches: path => path === '/explorer' },
    { href: '/project', label: 'المشروع', icon: BookOpenCheckIcon, matches: path => path.startsWith('/project') },
    { href: '/docs', label: 'الوثائق', icon: FilesIcon, matches: path => path === '/docs' || path.startsWith('/docs/') },
    { href: '/developer', label: 'للمطور', icon: FilesIcon, matches: path => path === '/developer' }
  ]
}

let nav_items = $derived(get_nav_items())
let current_path = $derived($route.path || '/')
let current_language = $derived(get_current_language())
let brand_title = $derived(current_language === 'ar' ? BRAND_TITLE_AR : BRAND_TITLE_EN)
let brand_secondary_title = $derived(current_language === 'ar' ? BRAND_TITLE_EN : BRAND_TITLE_AR)

function is_active(item) {
  return item.matches ? item.matches(current_path) : current_path === item.href
}
</script>

<header class="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-5">
  <div class="editorial_shell page_shell px-4 py-4 sm:px-7">
    <div class="flex flex-col gap-4">
      <div class="flex items-start justify-between gap-4 md:items-center">
        <a class="flex min-w-0 items-center gap-3" href={window.navgo.href('/')}>
        <div class="flex size-11 items-center justify-center rounded-full border border-accent/20 bg-accent-soft/70 text-accent-strong">
          <PanelsTopLeftIcon class="size-5" />
        </div>
        <div class="min-w-0">
          {#if current_language === 'ar'}
            <div class="arabic_title text-lg text-ink sm:text-xl">{brand_title}</div>
            <div class="truncate text-[0.7rem] font-extrabold tracking-[0.2em] text-ink-soft uppercase sm:text-sm">{brand_secondary_title}</div>
          {:else}
            <div class="truncate text-[0.7rem] font-extrabold tracking-[0.2em] text-ink-soft uppercase sm:text-sm">{brand_title}</div>
            <div class="arabic_title text-base text-ink sm:text-lg">{brand_secondary_title}</div>
          {/if}
        </div>
        </a>

        <nav class="hidden items-center gap-6 md:flex">
          {#each nav_items as item (item.href)}
            <a class="nav_link flex items-center gap-2" data-active={is_active(item) ? 'true' : 'false'} href={window.navgo.href(item.href)}>
              <item.icon class="size-4" />
              <span>{item.label}</span>
            </a>
          {/each}
        </nav>

        <div class="hidden items-center gap-2 lg:flex">
          <span class="stat_chip">{compact_number(summary.by_system ? Object.keys(summary.by_system).length : 0)} نظام عدّ</span>
          <span class="stat_chip">{compact_number(summary.total_points)} موضع مختلف فيه</span>
        </div>

        <div class="flex shrink-0 items-center gap-2" role="group" aria-label="تبديل اللغة">
          <span class="hidden text-ink-soft sm:inline-flex"><GlobeIcon class="size-4" /></span>
          <button
            type="button"
            class="nav_link rounded-full px-2 py-2 text-sm sm:px-3"
            data-active={current_language === 'ar' ? 'true' : 'false'}
            aria-pressed={current_language === 'ar'}
            lang="ar"
            onclick={() => set_language('ar')}
          >
            العربية
          </button>
          <button
            type="button"
            class="nav_link rounded-full px-2 py-2 text-sm sm:px-3"
            data-active={current_language === 'en' ? 'true' : 'false'}
            aria-pressed={current_language === 'en'}
            lang="en"
            onclick={() => set_language('en')}
          >
            الإنجليزية
          </button>
        </div>
      </div>
    </div>

    <nav class="mt-4 grid grid-cols-3 gap-2 border-t border-line/60 pt-4 sm:grid-cols-4 md:hidden">
      {#each nav_items as item (item.href)}
        <a
          class="mobile_nav_link"
          data-active={is_active(item) ? 'true' : 'false'}
          href={window.navgo.href(item.href)}
        >
          <item.icon class="size-4" />
          <span>{item.label}</span>
        </a>
      {/each}
    </nav>
  </div>
</header>
