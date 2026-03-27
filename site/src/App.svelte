<script>
import Header from './components/Header.svelte'
import SiteFooter from './components/SiteFooter.svelte'

const { Component, route_params } = $props()
</script>

<div class="min-h-dvh">
  <Header />

  <main class="px-3 pb-8 pt-4 sm:px-5 sm:pb-12 sm:pt-6">
    <div class="page_shell editorial_shell px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <Component {...route_params} />
    </div>
  </main>

  <SiteFooter />
</div>
