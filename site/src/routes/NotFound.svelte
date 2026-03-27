<script>
import { app_href } from '$lib/nav.js'
</script>

<section class="surface p-6 sm:p-8">
  <div class="rule_label">Not found</div>
  <h1 class="section_title mt-4">This page does not exist in the atlas.</h1>
  <p class="section_text mt-3">Try the main atlas overview or the explorer instead.</p>
  <div class="mt-6 flex gap-3">
    <a class="pill_button" data-tone="accent" href={app_href('/')}>Go home</a>
    <a class="pill_button" href={app_href('/explorer')}>Open explorer</a>
  </div>
</section>
