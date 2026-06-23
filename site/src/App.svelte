<script>
import Header from './components/Header.svelte'
import SiteFooter from './components/SiteFooter.svelte'

const { Component, route_params, route_hash, route_query } = $props()
</script>

<div class="min-h-dvh">
  <Header />

  <main class="px-3 pb-8 pt-6 sm:px-5 sm:pb-12 sm:pt-8">
    <div class="page_shell py-0">
      <Component {...route_params} route_hash={route_hash} route_query={route_query} />
    </div>
  </main>

  <SiteFooter />
</div>
