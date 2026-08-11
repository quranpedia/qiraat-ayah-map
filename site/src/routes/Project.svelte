<script>
const terms = [
  {
    term: 'رأس الآية',
    body: 'الموضع الذي تنتهي عنده الآية ويبتدئ ما بعدها.'
  },
  {
    term: 'مذهب العدّ',
    body: 'مذهب متوارث في عدّ الآي، تنسبه كتب العدّ إلى أهل مِصْر من الأمصار كالمدينة ومكة والبصرة والشام والكوفة.'
  },
  {
    term: 'موضع الخلاف',
    body: 'موضع بعينه يعدّه بعض المذاهب رأس آية ويتركه بعضها.'
  },
  {
    term: 'الأثر في الترقيم',
    body: 'ما يلزم من عدّ الموضع أو تركه: ضمّ آيتين في واحدة، أو فصل الواحدة إلى آيتين.'
  }
]
</script>

<section class="leaf">
  <span class="marginal">دليل المشروع</span>
  <div class="leaf_body">
    <h1 class="page_title">رؤوس الآي ومذاهب العدّ الستة</h1>
    <p class="lede mt-5">
      تجد كل موضع خلاف في سياقه من المصحف، ومعه من يعدّه من المذاهب ومن يتركه.
    </p>

    <div class="mt-7 flex flex-wrap gap-3">
      <a class="pill_button" data-tone="accent" href={window.navgo.href('/mushaf')}>افتح المصحف</a>
      <a class="pill_button" href={window.navgo.href('/ayah-counts')}>راجع أعداد الآي</a>
      <a class="pill_button" href={window.navgo.href('/explorer')}>ابحث عن رأس آية</a>
    </div>
  </div>
</section>

<section class="leaf">
  <span class="marginal">المسألة</span>
  <div class="leaf_body">
    <h2 class="section_title">خلافُ العدّ في مواضع رؤوس الآي</h2>
    <div class="mt-5 grid gap-4" style="color:var(--ink-soft)">
      <p>
        عدُّ الآي علمٌ يبحث في أحوال آيات القرآن الكريم من حيث عددُها في كل سورة، وبيانُ رأس الآية وخاتمتها، معزوًّا إلى ناقله.
      </p>
      <p>
        والاختلاف فيه اختلافٌ في تحديد موضع انتهاء الآية، وليس زيادةً في الآيات ولا نقصًا منها، ولا زيادةَ ألفاظ.
      </p>
      <p>
        فسورة الإخلاص أربعُ آيات في المدني الأول والمدني الأخير والبصري والكوفي، وخمسُ آيات في المكي والدمشقي؛ والخلاف في
        <span class="rubric">﴿لم يلد ولم يولد﴾</span>: أهي آية واحدة أم آيتان؟
      </p>
      <p>
        وليس الخلاف عامًّا؛ فمن السور ما خلا منه، ومنها ما فيه موضع أو مواضع.
      </p>
    </div>
  </div>
</section>

<section class="leaf">
  <span class="marginal">تنبيه للمراجع</span>
  <div class="leaf_body">
    <h2 class="section_title">عدُّ الآي علمٌ مستقلٌّ عن وجوه القراءة</h2>
    <p class="section_text mt-4">
      يقتصر هذا المرجع على مواضع رؤوس الآي وأثرها في الترقيم، وهذه حدوده.
    </p>

    <dl class="gloss mt-6">
      <div>
        <dt>الخلاف في القراءات ليس موضوع هذا المرجع</dt>
        <dd>
          بين القراءات اختلافٌ في فرش الحروف، نحو <span class="rubric">﴿مالك يوم الدين﴾</span> و<span class="rubric">﴿ملك يوم الدين﴾</span>.
          وهذا خارج نطاق المشروع.
        </dd>
      </div>
      <div>
        <dt>النص المعروض برواية حفص عن عاصم</dt>
        <dd>
          المصحف هنا مرسومٌ بالرسم العثماني على رواية حفص، ولا يتبدّل لفظه باختيار مذهب عدٍّ آخر؛ فالذي يتبدّل هو الترقيم وحده.
        </dd>
      </div>
      <div>
        <dt>مذهب العدّ لا يخصّ قراءةً بعينها</dt>
        <dd>
          قد تشترك قراءاتٌ في مذهب عدٍّ واحد، فلا يلزم من اتفاق مذهبين في العدّ اتفاقُ قارئيهما في وجوه القراءة، ولا العكس.
        </dd>
      </div>
      <div>
        <dt>لا نتجاوز ما يشهد به المصدر</dt>
        <dd>
          ما لم يُنقل شاهده من كتب العدّ يبقى معلَّمًا بأنه غير موثق، وما تعارضت فيه المصادر يبقى مختلفًا فيه من غير ترجيح.
        </dd>
      </div>
    </dl>
  </div>
</section>

<section class="leaf">
  <span class="marginal">أهل العدد</span>
  <div class="leaf_body" style="max-width:none">
    <h2 class="section_title">ستةُ مذاهب، بعدد المصاحف التي وجّهها عثمان إلى الأمصار</h2>
    <p class="section_text mt-4">
      لكل مذهب ناقلٌ يُعزى إليه، وعليه يُعتمد في القراءات.
    </p>

    <div class="table_shell mt-6">
      <table class="data_table">
        <thead>
          <tr>
            <th>المذهب</th>
            <th>نقلُه</th>
            <th>يُعتمد لـ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="color:var(--ink);font-weight:700">المدني الأول</td>
            <td>ما يرويه نافع عن شيخيه أبي جعفر وشيبة بن نصاح.</td>
            <td>قالون وأبو جعفر</td>
          </tr>
          <tr>
            <td style="color:var(--ink);font-weight:700">المدني الأخير</td>
            <td>ما يرويه إسماعيل بن جعفر وقالون عن سليمان بن مسلم بن جمّاز، عن شيبة وأبي جعفر.</td>
            <td>ورش</td>
          </tr>
          <tr>
            <td style="color:var(--ink);font-weight:700">المكي</td>
            <td>ما رواه عبد الله بن كثير عن مجاهد بن جبر، عن ابن عباس، عن أُبيّ بن كعب، عن رسول الله ﷺ.</td>
            <td>ابن كثير</td>
          </tr>
          <tr>
            <td style="color:var(--ink);font-weight:700">البصري</td>
            <td>ما يرويه عاصم الجحدري وأيوب بن المتوكل ويعقوب الحضرمي.</td>
            <td>أبو عمرو ويعقوب</td>
          </tr>
          <tr>
            <td style="color:var(--ink);font-weight:700">الكوفي</td>
            <td>ما رواه حمزة عن ابن أبي ليلى، وسفيان الثوري عن عبد الأعلى، كلاهما عن أبي عبد الرحمن السلمي، عن علي بن أبي طالب.</td>
            <td>عاصم وحمزة والكسائي وخلف</td>
          </tr>
          <tr>
            <td style="color:var(--ink);font-weight:700">الدمشقي</td>
            <td>ما رواه يحيى بن الحارث الذماري عن عبد الله بن عامر، عن أبي الدرداء.</td>
            <td>ابن عامر</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="section_text mt-4 text-sm">
      وبعضهم يزيد عدًّا سابعًا هو الحمصي، وهو ما رواه شريح بن يزيد مسندًا إلى خالد بن معدان.
    </p>
  </div>
</section>

<section class="leaf">
  <span class="marginal">المصطلحات</span>
  <div class="leaf_body">
    <h2 class="section_title">ألفاظ يتكرر ورودها</h2>
    <dl class="gloss mt-6">
      {#each terms as item (item.term)}
        <div>
          <dt>{item.term}</dt>
          <dd>{item.body}</dd>
        </div>
      {/each}
    </dl>
  </div>
</section>

<section class="leaf">
  <span class="marginal">قراءة الموضع</span>
  <div class="leaf_body">
    <h2 class="section_title">لموضع الخلاف حالان لا ثالثة لهما</h2>
    <p class="section_text mt-4">
      المقارنة تجري على الترقيم الكوفي؛ لأنه ترقيم المصاحف المنتشرة اليوم.
    </p>

    <dl class="gloss mt-6">
      <div>
        <dt>موضع في آخر الآية، يعدّه الكوفي</dt>
        <dd>
          الموضع واقع في آخر آية كوفية. فمن لم يعدّه من المذاهب ضمّ هذه الآية إلى ما بعدها، فنقص عدده عن الكوفي.
        </dd>
      </div>
      <div>
        <dt>موضع داخل الآية، لا يعدّه الكوفي</dt>
        <dd>
          الموضع واقع داخل آية كوفية. فمن عدّه من المذاهب فصل هذه الآية إلى آيتين، فزاد عدده على الكوفي.
        </dd>
      </div>
    </dl>
  </div>
</section>

<section class="leaf">
  <span class="marginal">المسار العملي</span>
  <div class="leaf_body">
    <h2 class="section_title">كيف تقرأ الموضع</h2>
    <ol class="numbered_steps mt-7" style="color:var(--ink-soft)">
      <li>
        <div>
          <b>اختر مذهب العدّ.</b>
          <span>يبدأ المرجع من الترقيم الذي تريد القراءة به، لا من جدول مقارنة عام.</span>
        </div>
      </li>
      <li>
        <div>
          <b>اختر السورة.</b>
          <span>تظهر الآيات مرقمة بحسب المذهب المختار.</span>
        </div>
      </li>
      <li>
        <div>
          <b>افتح التفصيل عند الحاجة.</b>
          <span>عند رأس الآية المختلف فيه يظهر من يعدّه ومن لا يعدّه مع الشواهد المتاحة.</span>
        </div>
      </li>
    </ol>
  </div>
</section>

<section class="leaf">
  <span class="marginal">التوثيق</span>
  <div class="leaf_body" style="max-width:none">
    <h2 class="section_title">لكل موضع حال معلنة في التوثيق</h2>
    <p class="section_text mt-4">
      الشواهد مفصولة عن المواضع؛ فلا يُعرض الموضع أقوى مما تحتمله مصادره. وحال التوثيق ظاهرة في صفحة كل موضع.
    </p>

    <div class="table_shell mt-6">
      <table class="data_table">
        <thead>
          <tr>
            <th>الحال</th>
            <th>معناها</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="color:var(--ink);font-weight:700">موثق بأصل</td>
            <td>ثبت الموضع بنصّ من كتب العدّ المعتمدة، مثل "البيان في عدّ آي القرآن" لأبي عمرو الداني.</td>
          </tr>
          <tr>
            <td style="color:var(--ink);font-weight:700">شواهد ثانوية</td>
            <td>لم يثبت بأصل بعد، وإنما اعتُمد فيه على المنظومات والشروح المتأخرة.</td>
          </tr>
          <tr>
            <td style="color:var(--ink);font-weight:700">مختلف فيه</td>
            <td>تعارضت فيه المصادر، فتُرك الخلاف ظاهرًا ولم يُرجَّح.</td>
          </tr>
          <tr>
            <td style="color:var(--ink);font-weight:700">غير موثق بعد</td>
            <td>الموضع مثبت في البيانات، ولم يُنقَل شاهده من مصدره إلى الآن.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="leaf">
  <span class="marginal">الفائدة</span>
  <div class="leaf_body">
    <h2 class="section_title">فوائد معرفة رؤوس الآي</h2>
    <div class="mt-5 grid gap-4" style="color:var(--ink-soft)">
      <p>معرفة الرأس تعين القارئ والمعلّم على تمييز موضع انتهاء الآية في مذهب العدّ المختار.</p>
      <p>وإذا اختلف رقم الآية بين مصدرين، فقد يكون السبب اختلاف مذهب العدّ، فيُراجَع قبل أن يُظنّ الخطأ في العزو.</p>
      <p>وعند الانتقال بين مصاحف وكتب تستعمل ترقيمًا مختلفًا، تصير الإحالة إلى السورة والآية أوضح وأضبط.</p>
    </div>

    <div class="mt-7 flex flex-wrap gap-3">
      <a class="pill_button" href={window.navgo.href('/docs')}>مكتبة الوثائق</a>
      <a class="pill_button" href={window.navgo.href('/developer')}>صفحة المطور</a>
    </div>
  </div>
</section>

<section class="leaf">
  <span class="marginal">المؤلفات</span>
  <div class="leaf_body">
    <h2 class="section_title">من كتب هذا العلم</h2>
    <ul class="doc_list mt-5" style="color:var(--ink-soft)">
      <li>"البيان في عدّ آي القرآن" لأبي عمرو الداني</li>
      <li>"ناظمة الزهر" للشاطبي</li>
      <li>"حسن المدد" للجعبري</li>
      <li>"سعادة الدارين في بيان وعدّ آي معجز الثقلين" لمحمد بن علي بن خلف الحداد الحسيني</li>
      <li>"القول الوجيز في معرفة فواصل الكتاب العزيز" للمخلّلاتي</li>
      <li>"الفرائد الحسان في عدّ آي القرآن" للقاضي</li>
      <li>"مرشد الخلان إلى معرفة عدّ آي القرآن" لعبد الرزاق علي موسى</li>
    </ul>
  </div>
</section>
