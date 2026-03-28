<script>
import { BookOpenCheckIcon, CompassIcon, FilesIcon, LibraryBigIcon, MilestoneIcon, PanelsTopLeftIcon, SearchIcon } from '@lucide/svelte'

import { summary } from '$lib/dataset.svelte.js'
import { app_href } from '$lib/nav.js'

const { route } = window.navgo

const nav_items = [
  { href: '/', label: 'Atlas', icon: CompassIcon, matches: path => path === '/' },
  { href: '/surahs', label: 'Surahs', icon: LibraryBigIcon, matches: path => path === '/surahs' || path.startsWith('/surahs/') },
  { href: '/compare', label: 'Compare', icon: MilestoneIcon, matches: path => path === '/compare' },
  { href: '/explorer', label: 'Explorer', icon: SearchIcon, matches: path => path === '/explorer' },
  { href: '/project', label: 'Project', icon: BookOpenCheckIcon, matches: path => path.startsWith('/project') },
  { href: '/developer', label: 'Developer', icon: FilesIcon, matches: path => path === '/developer' }
]

let current_path = $derived($route.path || '/')

function is_active(item) {
  return item.matches ? item.matches(current_path) : current_path === item.href
}
</script>

<header class="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-5">
  <div class="editorial_shell page_shell px-5 py-4 sm:px-7">
    <div class="flex items-center justify-between gap-6">
      <a class="flex items-center gap-3" href={app_href('/')}>
        <div class="flex size-11 items-center justify-center rounded-full border border-accent/20 bg-accent-soft/70 text-accent-strong">
          <PanelsTopLeftIcon class="size-5" />
        </div>
        <div>
          <div class="text-sm font-extrabold tracking-[0.2em] text-ink-soft uppercase">Qiraat Ayah Atlas</div>
          <div class="arabic_title text-base text-ink">أطلس عدِّ الآي</div>
        </div>
      </a>

      <nav class="hidden items-center gap-6 md:flex">
        {#each nav_items as item (item.href)}
          <a class="nav_link flex items-center gap-2" data-active={is_active(item) ? 'true' : 'false'} href={app_href(item.href)}>
            <item.icon class="size-4" />
            <span>{item.label}</span>
          </a>
        {/each}
      </nav>

      <div class="hidden items-center gap-3 lg:flex">
        <span class="stat_chip">{summary.by_system ? Object.keys(summary.by_system).length : 0} counting systems</span>
        <span class="stat_chip">{summary.total_points} disputed points</span>
      </div>
    </div>

    <nav class="mt-4 flex gap-4 overflow-x-auto border-t border-line/60 pt-4 md:hidden">
      {#each nav_items as item (item.href)}
        <a class="nav_link flex shrink-0 items-center gap-2" data-active={is_active(item) ? 'true' : 'false'} href={app_href(item.href)}>
          <item.icon class="size-4" />
          <span>{item.label}</span>
        </a>
      {/each}
    </nav>
  </div>
</header>
