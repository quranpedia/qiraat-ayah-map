<script>
import FatihaSpecimen from '~/components/FatihaSpecimen.svelte'
import { compact_number, get_system_name, summary, surahs, systems } from '$lib/dataset.svelte.js'
import { get_current_language } from '$lib/i18n.js'
import { get_qiraah_name } from '$lib/qiraat_names.js'
import { getMadhhabHref } from '$lib/route-urls.js'

const kufi_total = systems.find(system => system.id === 'kufi')?.total_ayahs ?? 0
const disputed_surah_count = surahs.filter(surah => surah.disputed_points > 0).length
const documented_points = summary.evidence.points_with_evidence

let current_language = $derived(get_current_language())
let separator = $derived(current_language === 'en' ? ', ' : '، ')
</script>

<section class="leaf">
  <span class="marginal">مدخل</span>
  <div class="leaf_body">
    <h1 class="page_title">عن المشروع</h1>
    <p class="lede mt-5">
      عدُّ الآي علمٌ يحدّد أين تنتهي كل آية. توارثت الأمصار فيه ستة مذاهب، فاختلف ترقيم الآيات بينها.
    </p>

    <div class="summary_note mt-6">
      <p>
        يجمع هذا المرجع المواضع التي اختلفت فيها المذاهب، ويعرض كلَّ موضع في سياقه من المصحف مع شواهده من كتب العدّ.
      </p>
      <p>
        موضوعه الترقيم دون وجوه القراءة. وما لم يثبت بشاهد يبقى معلَّمًا بذلك.
      </p>
    </div>

    <div class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
      <a class="pill_button" data-tone="accent" href={window.navgo.href('/mushaf')}>افتح المصحف</a>
      <a class="text_link" href={window.navgo.href('/ayah-counts')}>أعداد الآي</a>
      <a class="text_link" href={window.navgo.href('/explorer')}>البحث</a>
      <a class="text_link" href={window.navgo.href('/project')}>المشروع</a>
    </div>
  </div>
</section>

<section class="leaf">
  <span class="marginal">سورة الفاتحة</span>
  <div class="leaf_body">
    <h2 class="section_title">سبعُ آياتٍ عند الجميع، ورأسان مختلَفٌ فيهما</h2>
    <p class="section_text mt-4">
      اللفظ في هذين الموضعين واحد، وموضع العلامة مختلف؛ فصارت
      <span class="rubric">﴿الحمد لله رب العالمين﴾</span>
      الآية الثانية في مذهب، والأولى في آخر.
    </p>

    <div class="mt-7">
      <FatihaSpecimen />
    </div>

    <p class="section_text mt-6">
      العلامة الذهبية رأسٌ معدود، والدائرة المتقطّعة موضعٌ لا يعدّه هذا المذهب. ولا يكفي مجموع آيات السورة للدلالة على المذهب؛ فالمرجع رؤوس الآي نفسها.
    </p>
    <p class="section_text mt-3 text-sm">
      والنص المعروض برواية حفص عن عاصم؛ ومذهب العدّ يغيّر الترقيم لا اللفظ.
      <a class="text_link" href={window.navgo.href('/project')}>تنبيه للمراجع العلمي</a>
    </p>

    <div class="mt-6">
      <a class="pill_button" href={window.navgo.href('/surahs/1')}>اقرأ الفاتحة كاملة</a>
    </div>
  </div>
</section>

<section class="leaf">
  <span class="marginal">مذاهب العدّ</span>
  <div class="leaf_body" style="max-width:none">
    <h2 class="section_title">مجموع الآيات في كل مذهب</h2>
    <p class="section_text mt-4">
      الفرق محسوب بالنسبة إلى الكوفي؛ لأنه ترقيم المصاحف المنتشرة اليوم.
    </p>
    <p class="section_text mt-3 text-sm">
      المصحف المنتشر برواية حفص عن عاصم، وعدده كوفي. ومصاحف ورش وقالون عن نافع عددها مدني أخير.
    </p>

    <div class="table_shell mt-6">
      <table class="data_table">
        <thead>
          <tr>
            <th>مذهب العدّ</th>
            <th>القراءات التي تعدّ به</th>
            <th>مجموع الآيات</th>
            <th>الفرق عن الكوفي</th>
          </tr>
        </thead>
        <tbody>
          {#each systems as system (system.id)}
            <tr>
              <td>
                <a class="text_link" href={window.navgo.href(getMadhhabHref('/madhhabs/' + system.id, system.id))}>
                  {get_system_name(system)}
                </a>
              </td>
              <td>{system.used_by_qiraat.map(slug => get_qiraah_name(slug, current_language)).join(separator)}</td>
              <td class="num">{compact_number(system.total_ayahs)}</td>
              <td class="num" style="color:var(--ink-faint)">
                {system.id === 'kufi' ? '—' : compact_number(system.total_ayahs - kufi_total)}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="leaf">
  <span class="marginal">حال التوثيق</span>
  <div class="leaf_body">
    <h2 class="section_title">ما وُثِّق، وما لم يوثَّق بعد</h2>
    <p class="section_text mt-4">
      الشواهد معروضة كما هي؛ فغير الموثق يبقى ظاهرًا، ولا يُسوّى بالموثق.
    </p>
    <p class="section_text mt-4">
      المواضع المرصودة {compact_number(summary.total_points)} موضعًا، وقع الخلاف منها في {compact_number(disputed_surah_count)} سورة من
      {compact_number(surahs.length)}. وقد بلغ الموثق بشاهد {compact_number(documented_points)} موضعًا، منها
      {compact_number(summary.by_verification_status.primary_cited)} موضعًا ثبت بأصل من كتب العدّ، ويبقى
      {compact_number(summary.by_verification_status.uncited)} موضعًا غير موثق إلى الآن.
    </p>

    <div class="mt-6 flex flex-wrap gap-3">
      <a class="pill_button" href={window.navgo.href('/project')}>دليل المشروع</a>
      <a class="pill_button" href={window.navgo.href('/docs')}>مكتبة الوثائق</a>
    </div>
  </div>
</section>
