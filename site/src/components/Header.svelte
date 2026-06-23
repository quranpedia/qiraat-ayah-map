<script>
import {
  BookOpenCheckIcon,
  GlobeIcon,
  InfoIcon,
  LibraryBigIcon,
  SearchIcon
} from '@lucide/svelte'

import { get_current_language, set_language } from '$lib/i18n.js'
import { primary_navigation_items, route_matches } from '$lib/navigation.js'

const { route } = window.navgo

const nav_icons = {
  mushaf: LibraryBigIcon,
  'ayah-counts': BookOpenCheckIcon,
  explorer: SearchIcon,
  project: InfoIcon
}

// @wc-ignore
const BRAND_TITLE_AR = 'مرجع عدِّ الآي'
const BRAND_TITLE_EN = 'Ayah Count Reference'

let current_path = $derived($route.path || '/')
let current_language = $derived(get_current_language())
let brand_title = $derived(current_language === 'ar' ? BRAND_TITLE_AR : BRAND_TITLE_EN)
let brand_secondary_title = $derived(current_language === 'ar' ? BRAND_TITLE_EN : BRAND_TITLE_AR)

function is_active(item) {
  return route_matches(item, current_path)
}
</script>

<header class="sticky top-0 z-40 border-b border-line/70 bg-paper/95 px-3 py-3 backdrop-blur sm:px-5">
  <div class="page_shell flex flex-col gap-3 py-0">
    <div class="flex items-center justify-between gap-4">
      <a class="flex min-w-0 items-center gap-3" href={window.navgo.href('/')}>
        <div class="flex size-9 items-center justify-center rounded-full border border-line bg-paper-soft text-accent-strong">
          <LibraryBigIcon class="size-4" />
        </div>
        <div class="min-w-0 leading-tight">
          {#if current_language === 'ar'}
            <div class="arabic_title text-base text-ink sm:text-lg">{brand_title}</div>
            <div class="truncate text-[0.65rem] font-extrabold tracking-[0.18em] text-ink-soft uppercase sm:text-xs">{brand_secondary_title}</div>
          {:else}
            <div class="truncate text-xs font-extrabold tracking-[0.18em] text-ink-soft uppercase sm:text-sm">{brand_title}</div>
            <div class="arabic_title text-sm text-ink sm:text-base">{brand_secondary_title}</div>
          {/if}
        </div>
      </a>

      <nav class="hidden items-center gap-5 md:flex" aria-label="التنقل الرئيسي">
        {#each primary_navigation_items as item (item.id)}
          {@const Icon = nav_icons[item.id]}
          <a class="nav_link flex items-center gap-2" data-active={is_active(item) ? 'true' : 'false'} href={window.navgo.href(item.href)}>
            <Icon class="size-4" />
            <span>{current_language === 'en' ? item.label_en : item.label_ar}</span>
          </a>
        {/each}
      </nav>

      <div class="flex shrink-0 items-center gap-1" role="group" aria-label="تبديل اللغة">
        <span class="hidden text-ink-soft sm:inline-flex"><GlobeIcon class="size-4" /></span>
        <button
          type="button"
          class="language_button"
          data-active={current_language === 'ar' ? 'true' : 'false'}
          aria-pressed={current_language === 'ar'}
          lang="ar"
          onclick={() => set_language('ar')}
        >
          العربية
        </button>
        <button
          type="button"
          class="language_button"
          data-active={current_language === 'en' ? 'true' : 'false'}
          aria-pressed={current_language === 'en'}
          lang="en"
          onclick={() => set_language('en')}
        >
          English
        </button>
      </div>
    </div>

    <nav class="flex gap-2 overflow-x-auto pb-1 md:hidden" aria-label="التنقل الرئيسي للجوال">
      {#each primary_navigation_items as item (item.id)}
        {@const Icon = nav_icons[item.id]}
        <a
          class="compact_nav_link"
          data-active={is_active(item) ? 'true' : 'false'}
          href={window.navgo.href(item.href)}
        >
          <Icon class="size-4" />
          <span>{current_language === 'en' ? item.label_en : item.label_ar}</span>
        </a>
      {/each}
    </nav>
  </div>
</header>
