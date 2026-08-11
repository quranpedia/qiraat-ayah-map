<script>
import { get_grouped_docs, get_start_here_docs } from '$lib/docs.js'
import { get_current_language } from '$lib/i18n.js'

let query = $state('')

let current_language = $derived(get_current_language())
let grouped_docs = $derived(get_grouped_docs(current_language))
let start_here_docs = $derived(get_start_here_docs(current_language))

let normalized_query = $derived(query.trim().toLowerCase())

function matches(doc) {
  if (!normalized_query) {
    return true
  }

  return `${doc.title} ${doc.excerpt}`.toLowerCase().includes(normalized_query)
}

let filtered_groups = $derived(
  grouped_docs
    .map(group => ({ ...group, docs: group.docs.filter(matches) }))
    .filter(group => group.docs.length)
)

let result_count = $derived(filtered_groups.reduce((total, group) => total + group.docs.length, 0))
</script>

<section class="leaf">
  <span class="marginal">الوثائق</span>
  <div class="leaf_body">
    <h1 class="page_title">وثائق المشروع</h1>
    <p class="lede mt-5">
      ابدأ بالتعريف إن كانت زيارتك الأولى، وراجع المنهج قبل الحكم على المواضع.
    </p>
  </div>
</section>

<section class="leaf">
  <span class="marginal">ابدأ من هنا</span>
  <div class="leaf_body">
    <h2 class="section_title">اقرأ بالترتيب</h2>
    <ol class="numbered_steps mt-7">
      {#each start_here_docs as doc (doc.slug)}
        <li>
          <div>
            <a class="text_link" href={window.navgo.href('/docs/' + doc.slug)} dir={doc.direction}>{doc.title}</a>
            {#if doc.language !== current_language}
              <span class="ms-2 text-sm" style="color:var(--ink-faint)">{doc.language === 'ar' ? 'عربي' : 'English'}</span>
            {/if}
            <p class="mt-1 text-sm" style="color:var(--ink-soft)" dir={doc.direction}>{doc.excerpt}</p>
          </div>
        </li>
      {/each}
    </ol>
  </div>
</section>

<section class="leaf">
  <span class="marginal">كل الوثائق</span>
  <div class="leaf_body">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <h2 class="section_title">الوثائق حسب الموضوع</h2>
      <label class="block w-full sm:max-w-56">
        <span class="field_label">ابحث في الوثائق</span>
        <input class="search mt-2" type="search" bind:value={query} placeholder="ما الذي تبحث عنه؟" />
      </label>
    </div>

    {#if normalized_query}
      <p class="mt-4 text-sm" style="color:var(--ink-soft)">
        {#if result_count === 0}
          لا توجد وثيقة بهذا الاسم. جرّب كلمة أخرى.
        {:else}
          المطابق للبحث: <span class="num">{result_count}</span>
        {/if}
      </p>
    {/if}

    <div class="mt-8 grid gap-9">
      {#each filtered_groups as group (group.id)}
        <section>
          <h3 class="font-bold" style="color:var(--rubric)">{group.title}</h3>
          <p class="mt-1 text-sm" style="color:var(--ink-faint)">{group.description}</p>

          <dl class="gloss mt-5">
            {#each group.docs as doc (doc.slug)}
              <div>
                <dt>
                  <a class="text_link" href={window.navgo.href('/docs/' + doc.slug)} dir={doc.direction}>{doc.title}</a>
                  {#if doc.language !== current_language}
                    <span class="ms-2 text-sm font-normal" style="color:var(--ink-faint)">{doc.language === 'ar' ? 'عربي' : 'English'}</span>
                  {/if}
                </dt>
                <dd dir={doc.direction}>{doc.excerpt}</dd>
              </div>
            {/each}
          </dl>
        </section>
      {/each}
    </div>
  </div>
</section>

<section class="leaf">
  <span class="marginal">وثائق أخرى</span>
  <div class="leaf_body">
    <h2 class="section_title">عقود الملفات وحزم المصادر</h2>
    <div class="mt-5 flex flex-wrap gap-3">
      <a class="pill_button" href={window.navgo.href('/developer')}>افتح صفحة المطور</a>
      <a class="pill_button" href={window.navgo.href('/project')}>دليل المشروع</a>
    </div>
  </div>
</section>
