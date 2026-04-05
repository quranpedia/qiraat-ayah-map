export const docs = [
  {
    "slug": "project-introduction-ar",
    "title": "التعريف بالمشروع",
    "language": "ar",
    "direction": "rtl",
    "group": "overview",
    "sourcePath": "project-introduction.ar.md",
    "alternateSlug": "project-introduction",
    "excerpt": "هذا المستند مدخل عربي غير تقني لمستودع «خريطة ربط أرقام الآيات بين القراءات».",
    "headers": [
      {
        "id": "section-2",
        "level": 2,
        "title": "المشكلة"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "الحاجة إلى المشروع"
      },
      {
        "id": "section-4",
        "level": 2,
        "title": "ما ينشره المشروع"
      },
      {
        "id": "section-5",
        "level": 3,
        "title": "الأولى: الأصول العلمية"
      },
      {
        "id": "section-6",
        "level": 3,
        "title": "الثانية: المخرجات المولَّدة"
      },
      {
        "id": "section-7",
        "level": 3,
        "title": "الثالثة: العرض والمراجعة"
      },
      {
        "id": "section-8",
        "level": 2,
        "title": "المنهج"
      },
      {
        "id": "section-9",
        "level": 2,
        "title": "ربط البيانات بالمصادر"
      },
      {
        "id": "section-10",
        "level": 2,
        "title": "ما لا يدّعيه المشروع"
      },
      {
        "id": "section-11",
        "level": 2,
        "title": "مراحل العمل"
      },
      {
        "id": "section-12",
        "level": 2,
        "title": "دليل المراجع"
      },
      {
        "id": "section-13",
        "level": 2,
        "title": "ما بقي مفتوحًا"
      },
      {
        "id": "section-14",
        "level": 2,
        "title": "مَن يخدمه المشروع؟"
      },
      {
        "id": "section-15",
        "level": 3,
        "title": "أهل الاختصاص"
      },
      {
        "id": "section-16",
        "level": 3,
        "title": "المطوِّرون"
      },
      {
        "id": "section-17",
        "level": 2,
        "title": "من أين تبدأ؟"
      }
    ],
    "html": "<h1 id=\"section-1\">التعريف بالمشروع</h1>\n<p>هذا المستند مدخل عربي غير تقني لمستودع «خريطة ربط أرقام الآيات بين القراءات».</p>\n<p>كُتب لمن له عناية بعلم <strong>عدّ الآي</strong> وعلوم القرآن، ويودّ أن يستوعب صورة المشروع قبل مطالعة ملفاته البرمجية: ما المشكلة التي يعالجها، ولماذا أُنشئ، وعلى أيّ أساس بُني، وكيف رُبطت بياناته بمصادر العدّ.</p>\n<p><a href=\"project-introduction\">Read this document in English</a></p>\n<hr/>\n<h2 id=\"section-2\">المشكلة</h2>\n<p>لا يصلح رقم الآية وحده مرجعًا ثابتًا في المقارنة بين القراءات والمصاحف؛ إذ تختلف مواضع <strong>رؤوس الآي</strong> باختلاف أنظمة العدّ الستة.</p>\n<p>فقد يكون الموضع رأس آية في العدّ الكوفي ولا يكون كذلك في غيره، أو يقع في وسط آية كوفية موضعٌ يعدّه نظام آخر رأسَ آية. والألفاظ القرآنية هي هي في جميع الأحوال، وإنّما يتغيّر <strong>ترقيم الآيات</strong> من عدّ إلى آخر.</p>\n<p>ويظهر أثر هذا الاختلاف في مجالات عدّة:</p>\n<ul class=\"doc_list\">\n<li><strong>الإحالات العلمية والحواشي</strong>؛ فقد يحيل الباحث إلى رقم آية لا يطابق ما في مصحف القارئ</li>\n<li><strong>تطبيقات القرآن ومحرّكات البحث</strong>؛ فكثير منها يفترض ترقيمًا واحدًا لسائر القراءات</li>\n<li><strong>واجهات البرمجة وقواعد البيانات</strong>؛ فقد تختلف الأرقام بين مصدرين دون أن يكون في أحدهما خطأ نصّي</li>\n<li><strong>أعمال التحقيق والمراجعة التحريرية</strong>؛ فالمحقّق يحتاج إلى ربط دقيق بين الأعداد</li>\n</ul>\n<h2 id=\"section-3\">الحاجة إلى المشروع</h2>\n<p>يجمع المشروع بين غايتين:</p>\n<ol class=\"doc_list\">\n<li><strong>طبقة بيانات تشغيلية</strong> يستعملها المطوِّرون في تطبيقات القرآن مباشرة</li>\n<li><strong>طبقة علمية مختصرة قابلة للمراجعة</strong> يستطيع المتخصّص أن يقرأها ويحاكمها على ضوء كتب العدّ</li>\n</ol>\n<p>ولا تتحقّق هاتان الغايتان بصيغة واحدة.</p>\n<p>فالمطوِّر يحتاج إلى خرائط ربط جاهزة تنقل الأرقام من نظام إلى آخر، أمّا الباحث فيحتاج إلى صياغة مختصرة تجيب عن سؤال كتب العدّ:</p>\n<blockquote>\n<p>هل هذا الموضع رأس آية في هذا العدد أم لا؟ وما شاهده؟</p>\n</blockquote>\n<p>ولذلك فُصل في المشروع بين <strong>طبقة الدعوى العلمية المختصرة</strong> و<strong>طبقة المخرجات المولَّدة</strong>.</p>\n<h2 id=\"section-4\">ما ينشره المشروع</h2>\n<p>ينشر المشروع ثلاث طبقات رئيسة:</p>\n<h3 id=\"section-5\">الأولى: الأصول العلمية</h3>\n<p>يضمّ مجلّد <code class=\"inline_code\">data/</code> الملفات الأصلية المحرَّرة يدويًّا، وأهمّها ملفّان:</p>\n<ul class=\"doc_list\">\n<li><strong><code class=\"inline_code\">book-boundary-primitives.json</code></strong>: يُثبت <strong>دعوى الموضع المختلَف فيه</strong>؛ أي: الكلمة، ونوع الموضع (نهاية آية أو رأس داخلي)، والأنظمة التي تعدّه رأس آية.</li>\n<li><strong><code class=\"inline_code\">book-boundary-evidence.json</code></strong>: يُثبت <strong>الشاهد العلمي</strong> لكلّ موضع، ويضبط حالة التحقّق والمراجعة.</li>\n</ul>\n<p>وهذه الطبقة هي المصدر التحريري الأصلي الذي يُطلب من المتخصّص مراجعته.</p>\n<h3 id=\"section-6\">الثانية: المخرجات المولَّدة</h3>\n<p>في مجلّد <code class=\"inline_code\">dist/</code> تُولَّد آليًّا:</p>\n<ul class=\"doc_list\">\n<li>خرائط الربط الأمامي والعكسي بين أنظمة العدّ</li>\n<li>ملفات الرواة وبياناتهم</li>\n<li>عدد آيات السور في كلّ نظام</li>\n<li>ملفات المراجعة العلمية</li>\n<li>تقارير المصالحة والملخّصات</li>\n</ul>\n<p>وهذه الطبقة مهمّة للمطوِّرين، لكنّها ليست الأساس الذي تُبنى عليه المراجعة العلمية.</p>\n<h3 id=\"section-7\">الثالثة: العرض والمراجعة</h3>\n<p>وُضع الموقع التجريبي وملفات <code class=\"inline_code\">dist/review/</code> لجعل الطبقة العلمية أيسر قراءةً ومراجعةً.</p>\n<p>فالمقصود أن يبدأ المراجع بسؤال واضح:</p>\n<blockquote>\n<p>هل هذا الموضع رأس آية هنا أم لا؟</p>\n</blockquote>\n<p>لا بمصفوفات ضخمة يصعب نقدها.</p>\n<h2 id=\"section-8\">المنهج</h2>\n<p>القاعدة الأساسية في المشروع:</p>\n<p><strong>نُثبت مواضع الخلاف أولًا، ثمّ نولِّد منها كلّ ما عداها.</strong></p>\n<p>ولهذا اختير العدّ الكوفي/حفص <strong>محورًا تشغيليًّا</strong> تدور عليه الخرائط، لا لتفضيل نظام على آخر، وإنّما لأنّ البرمجيات تحتاج إلى <strong>نقطة مرجعية واحدة ثابتة</strong> تمرّ بها التحويلات كلّها؛ فلا يحتاج كلّ زوج من الأنظمة إلى طبقة يدوية مستقلة.</p>\n<p>ولا يسجّل المشروع يدويًّا إلا:</p>\n<ul class=\"doc_list\">\n<li>رأسًا مختلَفًا عليه عند <strong>نهاية</strong> آية كوفية</li>\n<li>أو رأسًا مختلَفًا عليه <strong>داخل</strong> آية كوفية</li>\n<li>والأنظمةَ التي تعدّ هذا الموضع رأس آية</li>\n</ul>\n<p>ومن هذا الأصل المختصر تُولَّد الخرائط الباقية آليًّا.</p>\n<h2 id=\"section-9\">ربط البيانات بالمصادر</h2>\n<p>هذه من أهمّ ركائز المشروع؛ فهو لا يريد أن تبدو المخرجات المولَّدة أرسخ ممّا تسوِّغه شواهدها. ولذلك فُصل بين ثلاث مراتب:</p>\n<ol class=\"doc_list\">\n<li><strong>الدعوى</strong>: ما يُثبته المشروع من مواضع الخلاف</li>\n<li><strong>الشاهد</strong>: المستند العلمي لذلك الإثبات</li>\n<li><strong>المخرَج المولَّد</strong>: ما يُنتَج آليًّا من تلك الدعوى</li>\n</ol>\n<p>وتُرتَّب الشواهد على النحو الآتي:</p>\n<ol class=\"doc_list\">\n<li><strong>الشاهد الأوّلي</strong> من المصادر الأصلية في علم العدّ؛ كـ\"البيان في عدّ آي القرآن\" لأبي عمرو الداني</li>\n<li><strong>الشواهد اللاحقة</strong> من المتون والشروح؛ كـ\"الفرائد الحسان\" و\"نفائس البيان\"</li>\n<li><strong>حالة تحقّق معلنة</strong> لكلّ موضع: موثَّق أوّليًّا، أو ثانويًّا، أو مختلَف فيه، أو غير محسوم، أو غير موثَّق بعدُ</li>\n<li><strong>إبقاء المواضع المُشكِلة ظاهرة</strong> بدل تسويتها في الخفاء</li>\n</ol>\n<p>ولهذا أُضيفت طبقة <code class=\"inline_code\">book-boundary-evidence.json</code> وحزمة مصادر منظَّمة تحت <code class=\"inline_code\">sources/</code>؛ ليبقى <strong>أفق التوثيق الحالي</strong> قابلًا للفحص وإعادة الإنتاج.</p>\n<p>ولا تغيّر هذه الشواهد طبقة الدعوى من تلقاء نفسها، وإنّما تؤيّدها أو تشرحها أو تكشف مواضع تحتاج إلى مزيد مراجعة.</p>\n<h2 id=\"section-10\">ما لا يدّعيه المشروع</h2>\n<p>لكي تبقى الدعوى منضبطة، لا بدّ من بيان ما <strong>لا</strong> يدّعيه المشروع:</p>\n<ul class=\"doc_list\">\n<li><strong>لا</strong> يُغني عن كتب العدّ الأصلية</li>\n<li><strong>لا</strong> يحسم كلّ موضع مختلَف فيه بحساب المجاميع وحدها</li>\n<li><strong>لا</strong> يتعامل مع سلوك التطبيقات والمواقع بوصفه شاهدًا أصليًّا</li>\n<li><strong>لا</strong> يسوّي الخلافات الصعبة ليُخرج ملفًّا نظيفًا</li>\n<li><strong>لا</strong> يصف جميع أوجه الخلاف في القراءات؛ فموضوعه أضيق من ذلك</li>\n</ul>\n<p>فحدود المشروع هي:</p>\n<p><strong>مواضع رؤوس الآي، وآثارها على ترقيم الآيات، وإمكان الربط بين أنظمة العدّ.</strong></p>\n<h2 id=\"section-11\">مراحل العمل</h2>\n<p>مرّ المشروع ـ على الجملة ـ بالمراحل الآتية:</p>\n<ol class=\"doc_list\">\n<li>مراجعة طبقة الخرائط الكبيرة القديمة</li>\n<li>إصلاح مواضع الخلل في التوليد والاتساق الداخلي</li>\n<li>تقليص الأصل العلمي إلى طبقة بدائية مختصرة موافقة لطريقة كتب العدّ</li>\n<li>إضافة طبقة شواهد مستقلة لكلّ موضع</li>\n<li>توليد ملفات مراجعة وموقع عرض للفحص</li>\n<li>البدء في تمرير الشواهد على المصادر الأصلية والمواد المنظَّمة المرفقة</li>\n<li>إبقاء المواضع المعلَّقة أو المُشكِلة ظاهرة بدل إخفائها</li>\n</ol>\n<p>فالمشروع انتقل من صورة <strong>خرائط كبيرة يصعب نقدها</strong> إلى صورة <strong>دعوى صغيرة قابلة للمراجعة، ومخرجات كبيرة قابلة لإعادة التوليد</strong>.</p>\n<h2 id=\"section-12\">دليل المراجع</h2>\n<p>الأنسب أن يبدأ المراجع من الطبقة العلمية الأصلية، لا من الخرائط المولَّدة تحت <code class=\"inline_code\">dist/mappings/</code>.</p>\n<p>والترتيب المقترح:</p>\n<ol class=\"doc_list\">\n<li>قراءة <code class=\"inline_code\">data/book-boundary-primitives.json</code></li>\n<li>قراءة <code class=\"inline_code\">data/book-boundary-evidence.json</code></li>\n<li>استعمال ملفات <code class=\"inline_code\">dist/review/</code> أو صفحات الموقع للتصفّح في صورة أيسر</li>\n<li>الرجوع إلى الشواهد المنظَّمة تحت <code class=\"inline_code\">sources/</code> عند الحاجة</li>\n</ol>\n<p>والمقصود أن يبقى سؤال المراجعة قريبًا من سؤال كتب العدّ:</p>\n<blockquote>\n<p>هل هذا الموضع رأس آية في هذا العدد أم لا؟</p>\n</blockquote>\n<h2 id=\"section-13\">ما بقي مفتوحًا</h2>\n<p>ليس كلّ شيء محسومًا بعدُ.</p>\n<p>ففي المشروع اليوم:</p>\n<ul class=\"doc_list\">\n<li>مواضع عليها شواهد أوّلية</li>\n<li>ومواضع عليها شواهد لاحقة فقط</li>\n<li>ومواضع لا تزال موضع نزاع أو نقص في التوثيق</li>\n</ul>\n<p>وليس هذا عيبًا في النموذج، بل هو من أمانته؛ فالغاية ليست ادّعاء أنّ كلّ شيء قد سُوِّي آليًّا، وإنّما جعل حالة المعرفة الحالية <strong>واضحة، وقابلة للمراجعة، وقابلة للتحسين</strong>.</p>\n<h2 id=\"section-14\">مَن يخدمه المشروع؟</h2>\n<h3 id=\"section-15\">أهل الاختصاص</h3>\n<p>يقدّم لهم المشروع:</p>\n<ul class=\"doc_list\">\n<li>هدف مراجعة أصغر وأوضح</li>\n<li>حالة توثيق صريحة لكلّ موضع</li>\n<li>أسئلة مفتوحة ظاهرة لا مخفيّة</li>\n<li>ملفات مراجعة وتقارير إحالة ومقارنة</li>\n</ul>\n<h3 id=\"section-16\">المطوِّرون</h3>\n<p>يقدّم لهم المشروع:</p>\n<ul class=\"doc_list\">\n<li>خرائط ربط جاهزة بين جميع الأنظمة</li>\n<li>تطبيعًا عكسيًّا إلى الكوفي/حفص</li>\n<li>ملفات الرواة وبياناتهم</li>\n<li>عدد آيات السور في كلّ نظام</li>\n<li>جسرًا ثابتًا بين أنظمة الترقيم في تطبيقات القرآن</li>\n</ul>\n<h2 id=\"section-17\">من أين تبدأ؟</h2>\n<ul class=\"doc_list\">\n<li><strong>المدخل العام</strong>: ابدأ بهذا المستند، ثمّ بصفحة <strong>Project</strong> في الموقع.</li>\n<li><strong>الاستعمال البرمجي</strong>: اقرأ <code class=\"inline_code\">/docs/developer-usage</code> أو صفحة <strong>Developer usage</strong> في الموقع.</li>\n<li><strong>مراجعة الطبقة العلمية</strong>: ابدأ من الملفات الآتية:<ul class=\"doc_list\">\n<li><code class=\"inline_code\">data/book-boundary-primitives.json</code></li>\n<li><code class=\"inline_code\">data/book-boundary-evidence.json</code></li>\n<li><code class=\"inline_code\">dist/review/</code></li>\n<li><code class=\"inline_code\">sources/al_bayan</code></li>\n<li><code class=\"inline_code\">sources/nafais</code></li>\n</ul>\n</li>\n</ul>"
  },
  {
    "slug": "project-introduction",
    "title": "What this project does",
    "language": "en",
    "direction": "ltr",
    "group": "overview",
    "sourcePath": "project-introduction.md",
    "alternateSlug": "project-introduction-ar",
    "excerpt": "This document is the plain-language entry point for the repository.",
    "headers": [
      {
        "id": "section-2",
        "level": 2,
        "title": "The problem"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "Our motivation"
      },
      {
        "id": "section-4",
        "level": 2,
        "title": "What the project publishes"
      },
      {
        "id": "section-5",
        "level": 3,
        "title": "1. A concise scholarly claim layer"
      },
      {
        "id": "section-6",
        "level": 3,
        "title": "2. Generated developer-facing outputs"
      },
      {
        "id": "section-7",
        "level": 3,
        "title": "3. A review and demo layer"
      },
      {
        "id": "section-8",
        "level": 2,
        "title": "What problem this project is trying to solve exactly"
      },
      {
        "id": "section-9",
        "level": 2,
        "title": "The basic approach"
      },
      {
        "id": "section-10",
        "level": 2,
        "title": "Why Kufi/Hafs is used as the hub"
      },
      {
        "id": "section-11",
        "level": 2,
        "title": "How the source layer matches the books"
      },
      {
        "id": "section-12",
        "level": 2,
        "title": "How we tie the data to ground truth"
      },
      {
        "id": "section-13",
        "level": 2,
        "title": "What the project does not do"
      },
      {
        "id": "section-14",
        "level": 2,
        "title": "How the work has proceeded so far"
      },
      {
        "id": "section-15",
        "level": 2,
        "title": "How a scholar should read the project"
      },
      {
        "id": "section-16",
        "level": 2,
        "title": "What remains open"
      },
      {
        "id": "section-17",
        "level": 2,
        "title": "How this helps scholars and developers at the same time"
      },
      {
        "id": "section-18",
        "level": 2,
        "title": "Where to start next"
      }
    ],
    "html": "<h1 id=\"section-1\">What this project does</h1>\n<p>This document is the plain-language entry point for the repository.</p>\n<p>Arabic companion: <a href=\"project-introduction-ar\"><code class=\"inline_code\">project-introduction.ar.md</code></a>.</p>\n<p>It is written for readers who already know the Qurʾānic sciences, especially <code class=\"inline_code\">ʿadad al-āy</code>, but who do not want to start by reading generator scripts or JSON schemas.</p>\n<h2 id=\"section-2\">The problem</h2>\n<p>In the Qurʾānic counting traditions, the same surah can carry different ayah numbers depending on where a counting system places the boundaries of the ayahs.</p>\n<p>So <code class=\"inline_code\">surah + ayah</code> is not always a stable reference across the ten Qiraat and their rawis.</p>\n<p>That matters in practice:</p>\n<ul class=\"doc_list\">\n<li>a note written in one riwāyah may point to a different ayah number in another</li>\n<li>Quran apps often assume one universal numbering scheme</li>\n<li>APIs and datasets can disagree without being textually inconsistent</li>\n<li>scholars and editors need a way to review disputed heads without wading through large generated tables</li>\n</ul>\n<p>The project exists to bridge that gap.</p>\n<h2 id=\"section-3\">Our motivation</h2>\n<p>We want two things at once:</p>\n<ol class=\"doc_list\">\n<li>a dataset that app developers can actually use</li>\n<li>a source layer that scholars can actually review</li>\n</ol>\n<p>Those two needs are not identical.</p>\n<p>Developers need fast forward and reverse maps.\nScholars need a small, inspectable statement of the actual disputed heads and the evidence for them.</p>\n<p>The repository is structured so that the scholarly layer stays small and reviewable, while the larger mapping files are generated from it.</p>\n<h2 id=\"section-4\">What the project publishes</h2>\n<p>The repository publishes three main layers.</p>\n<h3 id=\"section-5\">1. A concise scholarly claim layer</h3>\n<p>Under <code class=\"inline_code\">data/</code> the project keeps two canonical files:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">book-boundary-primitives.json</code></li>\n<li><code class=\"inline_code\">book-boundary-evidence.json</code></li>\n</ul>\n<p>The first says <strong>what</strong> disputed boundary is being claimed.\nThe second says <strong>why</strong> the project currently believes that claim, what sources support it, and whether the point is cited, disputed, unresolved, or still uncited.</p>\n<h3 id=\"section-6\">2. Generated developer-facing outputs</h3>\n<p>Under <code class=\"inline_code\">dist/</code> the project regenerates:</p>\n<ul class=\"doc_list\">\n<li>forward maps from Kufi/Hafs to the other counting systems</li>\n<li>reverse maps back to Kufi/Hafs</li>\n<li>rawi aliases</li>\n<li>per-surah ayah counts</li>\n<li>review packets</li>\n<li>summary and reconciliation artifacts</li>\n</ul>\n<p>These are important outputs, but they are not the primary scholarly source.</p>\n<h3 id=\"section-7\">3. A review and demo layer</h3>\n<p>The site and the review packets exist to make the source layer easier to inspect.</p>\n<p>The explorer, comparison views, and review tables are meant to help a scholar or editor ask a focused question:</p>\n<blockquote>\n<p>Is this point counted here as a raʾs ayah or not?</p>\n</blockquote>\n<p>That is a better review question than asking someone to audit large expanded mapping arrays.</p>\n<h2 id=\"section-8\">What problem this project is trying to solve exactly</h2>\n<p>The project is <strong>not</strong> trying to decide which counting system is the “real” one.</p>\n<p>It is trying to make the canonical counting systems interoperable and reviewable.</p>\n<p>In plain terms:</p>\n<ul class=\"doc_list\">\n<li>when one system counts a boundary and another omits it, the numbers drift</li>\n<li>apps need a reliable way to move between those numbers</li>\n<li>scholars need a way to check the boundary claim against the books</li>\n<li>both need unresolved points to remain visible rather than being silently smoothed over</li>\n</ul>\n<h2 id=\"section-9\">The basic approach</h2>\n<p>The project follows a simple rule:</p>\n<p><strong>record the disputed heads directly, then generate everything else from them</strong></p>\n<p>That means:</p>\n<ol class=\"doc_list\">\n<li>choose one operational hub numbering</li>\n<li>record only the disputed boundaries relative to that hub</li>\n<li>attach evidence to each disputed point</li>\n<li>generate the larger mapping files from that smaller reviewed layer</li>\n</ol>\n<p>The operational hub is Kufi/Hafs.\nThat choice is practical, not theological: downstream software needs one stable coordinate system.</p>\n<h2 id=\"section-10\">Why Kufi/Hafs is used as the hub</h2>\n<p>The repository uses Kufi/Hafs as the reference numbering for generation.</p>\n<p>This does <strong>not</strong> mean that the other systems are treated as less authoritative.\nIt means the project needs one stable numbering system so that every other system can be mapped to and from the same point of reference.</p>\n<p>Without a hub, every pairwise conversion would need its own hand-maintained layer.</p>\n<h2 id=\"section-11\">How the source layer matches the books</h2>\n<p>The source layer is shaped to match how the <code class=\"inline_code\">ʿadad al-āy</code> books speak.</p>\n<p>Instead of storing huge mapping arrays as the canonical truth, the project stores disputed ayah heads in a more book-like way:</p>\n<ul class=\"doc_list\">\n<li>a disputed end of a Hafs ayah</li>\n<li>a disputed internal break inside a Hafs ayah</li>\n<li>which counting systems count that point as a head</li>\n</ul>\n<p>That keeps the main scholarly question small and natural.</p>\n<h2 id=\"section-12\">How we tie the data to ground truth</h2>\n<p>The project does not want the generated outputs to look more certain than the evidence justifies.</p>\n<p>So the repository now separates:</p>\n<ul class=\"doc_list\">\n<li>the claim layer</li>\n<li>the evidence layer</li>\n<li>the generated mapping layer</li>\n</ul>\n<p>Ground truth is pursued in this order:</p>\n<ol class=\"doc_list\">\n<li>primary classical witnesses first</li>\n<li>later specialist manuals and commentaries as supporting witnesses</li>\n<li>explicit review status per point</li>\n<li>open exceptions kept visible when sources do not collapse neatly</li>\n</ol>\n<p>The repository also checks in structured source frontiers under <code class=\"inline_code\">sources/</code> so the current evidence frontier is inspectable and reproducible.</p>\n<p>At the moment this includes structured work from:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">البيان في عد آي القرآن</code></li>\n<li><code class=\"inline_code\">الفرائد الحسان</code></li>\n<li><code class=\"inline_code\">نفائس البيان</code></li>\n</ul>\n<p>Those witnesses do not silently rewrite the claim layer on their own. They support, qualify, or challenge the current primitives point by point.</p>\n<h2 id=\"section-13\">What the project does <strong>not</strong> do</h2>\n<p>To keep the claims honest, the project does not do several things.</p>\n<p>It does <strong>not</strong>:</p>\n<ul class=\"doc_list\">\n<li>replace the classical books</li>\n<li>infer new disputed boundaries from total counts alone</li>\n<li>treat API behavior as if it were primary evidence</li>\n<li>collapse conflicts silently just to make the dataset look clean</li>\n<li>try to model the entire textual variation of the Qiraat</li>\n</ul>\n<p>Its scope is narrower:</p>\n<p><strong>ayah boundaries and numbering interoperability</strong></p>\n<h2 id=\"section-14\">How the work has proceeded so far</h2>\n<p>Broadly, the repository has moved through these stages:</p>\n<ol class=\"doc_list\">\n<li>audit the old generated mapping layer</li>\n<li>repair inconsistencies in the generated outputs</li>\n<li>reduce the operational source of truth to concise disputed-boundary primitives</li>\n<li>add an evidence sidecar for each primitive</li>\n<li>add generated review packets and a demo site</li>\n<li>begin a source-witness pass against classical and later structured materials</li>\n<li>keep frontier exceptions explicit instead of hiding them</li>\n</ol>\n<p>So the project has gradually moved from “large mapping dump” toward “small scholarly source layer plus reproducible outputs.”</p>\n<h2 id=\"section-15\">How a scholar should read the project</h2>\n<p>A scholar should not start from <code class=\"inline_code\">dist/mappings/...</code>.</p>\n<p>A better order is:</p>\n<ol class=\"doc_list\">\n<li>read <code class=\"inline_code\">data/book-boundary-primitives.json</code></li>\n<li>read <code class=\"inline_code\">data/book-boundary-evidence.json</code></li>\n<li>use <code class=\"inline_code\">dist/review/</code> and the site explorer to inspect the points in a more readable form</li>\n<li>consult the structured witness frontier under <code class=\"inline_code\">sources/</code> when needed</li>\n</ol>\n<p>In other words, the project wants the review process to stay close to the books and the disputed heads, not to the generated arrays.</p>\n<h2 id=\"section-16\">What remains open</h2>\n<p>Not every point is fully settled yet.</p>\n<p>Some points already have primary support.\nSome still sit on later witnesses.\nSome remain disputed or uncited.</p>\n<p>That is not a bug in the model.\nIt is part of the model's honesty.</p>\n<p>The goal is not to pretend the whole field has been mechanically settled.\nThe goal is to make the current state legible, reviewable, and improvable.</p>\n<h2 id=\"section-17\">How this helps scholars and developers at the same time</h2>\n<p>For scholars, the project offers:</p>\n<ul class=\"doc_list\">\n<li>a smaller review target</li>\n<li>explicit evidence status</li>\n<li>visible unresolved questions</li>\n<li>review packets and cross-reference reports</li>\n</ul>\n<p>For developers, the project offers:</p>\n<ul class=\"doc_list\">\n<li>ready-to-use forward maps</li>\n<li>reverse normalization back to Hafs/Kufi</li>\n<li>rawi metadata and aliases</li>\n<li>per-surah counts</li>\n<li>a stable numbering bridge for Quran apps and APIs</li>\n</ul>\n<h2 id=\"section-18\">Where to start next</h2>\n<p>If you want the non-technical overview, start with this document and then the site’s <strong>Project</strong> page.</p>\n<p>If you want the practical integration side, read <code class=\"inline_code\">/docs/developer-usage</code> or the site’s <strong>Developer usage</strong> page.</p>\n<p>If you want to review the current source frontier, start with:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">data/book-boundary-primitives.json</code></li>\n<li><code class=\"inline_code\">data/book-boundary-evidence.json</code></li>\n<li><code class=\"inline_code\">dist/review/</code></li>\n<li><code class=\"inline_code\">sources/al_bayan</code></li>\n<li><code class=\"inline_code\">sources/nafais</code></li>\n</ul>"
  },
  {
    "slug": "developer-usage",
    "title": "Developer usage",
    "language": "en",
    "direction": "ltr",
    "group": "overview",
    "sourcePath": "developer-usage.md",
    "alternateSlug": null,
    "excerpt": "This is the simplest way to think about the dataset if you are building a Quran app, API, or interoperability layer.",
    "headers": [
      {
        "id": "section-2",
        "level": 2,
        "title": "The one-sentence model"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "What this data is for"
      },
      {
        "id": "section-4",
        "level": 2,
        "title": "What this data is not for"
      },
      {
        "id": "section-5",
        "level": 2,
        "title": "Start with these files"
      },
      {
        "id": "section-6",
        "level": 3,
        "title": "Forward map"
      },
      {
        "id": "section-7",
        "level": 3,
        "title": "Reverse map"
      },
      {
        "id": "section-8",
        "level": 3,
        "title": "Rawi metadata"
      },
      {
        "id": "section-9",
        "level": 3,
        "title": "Surah counts"
      },
      {
        "id": "section-10",
        "level": 2,
        "title": "Minimal examples"
      },
      {
        "id": "section-11",
        "level": 3,
        "title": "1. Hafs to another counting system"
      },
      {
        "id": "section-12",
        "level": 3,
        "title": "2. Another counting system back to Hafs"
      },
      {
        "id": "section-13",
        "level": 3,
        "title": "3. Resolve a rawi"
      },
      {
        "id": "section-14",
        "level": 2,
        "title": "How to read the statuses"
      },
      {
        "id": "section-15",
        "level": 3,
        "title": "mapped"
      },
      {
        "id": "section-16",
        "level": 3,
        "title": "merged"
      },
      {
        "id": "section-17",
        "level": 3,
        "title": "split"
      },
      {
        "id": "section-18",
        "level": 3,
        "title": "covers_multiple"
      },
      {
        "id": "section-19",
        "level": 2,
        "title": "Practical integration advice"
      },
      {
        "id": "section-20",
        "level": 2,
        "title": "Suggested internal strategy"
      }
    ],
    "html": "<h1 id=\"section-1\">Developer usage</h1>\n<p>This is the simplest way to think about the dataset if you are building a Quran app, API, or interoperability layer.</p>\n<h2 id=\"section-2\">The one-sentence model</h2>\n<p>Keep one internal hub numbering, then map into and out of the other counting systems only when you need to.</p>\n<p>In this repository, that hub is Kufi/Hafs.</p>\n<h2 id=\"section-3\">What this data is for</h2>\n<p>Use it when your app needs to:</p>\n<ul class=\"doc_list\">\n<li>show ayah numbers in more than one counting system</li>\n<li>normalize a non-Hafs ayah reference back to Hafs</li>\n<li>support riwāyah-specific numbering labels</li>\n<li>validate the number of ayahs in a surah for a given counting system</li>\n</ul>\n<h2 id=\"section-4\">What this data is <strong>not</strong> for</h2>\n<p>This repository does not ship the Qurʾān text itself.</p>\n<p>It tells you how numbering changes.\nYou should pair it with your own text layer, API, or mushaf dataset.</p>\n<h2 id=\"section-5\">Start with these files</h2>\n<h3 id=\"section-6\">Forward map</h3>\n<p>Use:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">dist/mappings/by-counting-system/kufi-to-{system}.json</code></li>\n</ul>\n<p>This is for the common case where your app already uses Hafs/Kufi references internally and needs to display another numbering system.</p>\n<h3 id=\"section-7\">Reverse map</h3>\n<p>Use:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">dist/mappings/by-counting-system/{system}-to-kufi.json</code></li>\n</ul>\n<p>This is for the opposite case: user input or external data arrives in another numbering system and you want to normalize back to Hafs/Kufi.</p>\n<h3 id=\"section-8\">Rawi metadata</h3>\n<p>Use:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">dist/rawis/{rawi}.json</code></li>\n</ul>\n<p>This tells you which counting system a rawi follows.</p>\n<h3 id=\"section-9\">Surah counts</h3>\n<p>Use:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">dist/surah-counts/{system}.json</code></li>\n</ul>\n<p>This gives the ayah count of each surah in that counting system.</p>\n<h2 id=\"section-10\">Minimal examples</h2>\n<h3 id=\"section-11\">1. Hafs to another counting system</h3>\n<pre class=\"code_block\"><code class=\"language-js\">const entry = mapping.surahs[String(surah)].ayahs[String(hafs_ayah)]\n</code></pre>\n<p>This returns an object such as:</p>\n<pre class=\"code_block\"><code class=\"language-js\">{ target_ayah: 1, status: 'merged', merges_with_next: true }\n</code></pre>\n<p>The number you usually display is <code class=\"inline_code\">target_ayah</code>.\nThe status tells you whether that mapping is a normal one-to-one case, a merge, or a split.</p>\n<h3 id=\"section-12\">2. Another counting system back to Hafs</h3>\n<pre class=\"code_block\"><code class=\"language-js\">const entry = reverse_mapping.surahs[String(surah)].ayahs[String(target_ayah)]\n</code></pre>\n<p>This returns an object such as:</p>\n<pre class=\"code_block\"><code class=\"language-js\">{ hafs_ayah: 1, hafs_ayahs: [1, 2], status: 'covers_multiple' }\n</code></pre>\n<p>Use <code class=\"inline_code\">hafs_ayah</code> as the normalized anchor.\nIf <code class=\"inline_code\">hafs_ayahs</code> is present, the target ayah covers a span of multiple Hafs ayahs.</p>\n<h3 id=\"section-13\">3. Resolve a rawi</h3>\n<pre class=\"code_block\"><code class=\"language-js\">const rawi = rawi_metadata\nrawi._counting_system\nrawi._mapping_file\n</code></pre>\n<p>If the user chooses Warsh, Qālūn, or another rawi, the metadata tells you which counting-system map to use.</p>\n<h2 id=\"section-14\">How to read the statuses</h2>\n<h3 id=\"section-15\"><code class=\"inline_code\">mapped</code></h3>\n<p>A normal one-to-one correspondence.</p>\n<h3 id=\"section-16\"><code class=\"inline_code\">merged</code></h3>\n<p>A Hafs ayah does not end as its own target ayah.\nIt continues into the next Hafs ayah’s target coverage.</p>\n<h3 id=\"section-17\"><code class=\"inline_code\">split</code></h3>\n<p>One Hafs ayah becomes multiple target ayahs.\nRead the target span from <code class=\"inline_code\">splits_into</code>.</p>\n<h3 id=\"section-18\"><code class=\"inline_code\">covers_multiple</code></h3>\n<p>In reverse maps, one target ayah covers multiple consecutive Hafs ayahs.</p>\n<h2 id=\"section-19\">Practical integration advice</h2>\n<ul class=\"doc_list\">\n<li>Keep surah numbers unchanged; only ayah boundaries move.</li>\n<li>Do not infer numbering from total ayah counts alone.</li>\n<li>If your app only supports one non-Hafs system, load only that system’s forward and reverse maps.</li>\n<li>If your UI is organized by riwāyah, use <code class=\"inline_code\">dist/rawis/</code> first.</li>\n<li>Kufan rawis are identity-numbered with Hafs, so they do not need separate conversion logic.</li>\n</ul>\n<h2 id=\"section-20\">Suggested internal strategy</h2>\n<p>For most apps, this is enough:</p>\n<ol class=\"doc_list\">\n<li>store internal references in Kufi/Hafs</li>\n<li>map outward for display</li>\n<li>map inward for normalization</li>\n<li>keep your text layer separate from the numbering layer</li>\n</ol>\n<p>That gives you a simple and stable model while still supporting other counting systems cleanly.</p>"
  },
  {
    "slug": "readme-ar",
    "title": "خريطة ربط أرقام الآيات بين القراءات",
    "language": "ar",
    "direction": "rtl",
    "group": "overview",
    "sourcePath": "README.ar.md",
    "alternateSlug": null,
    "excerpt": "مجموعة بيانات مفتوحة المصدر لربط أرقام الآيات بين أنظمة العدّ الستة المعتمدة في القراءات العشر.",
    "headers": [
      {
        "id": "section-2",
        "level": 2,
        "title": "تمهيد"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "المشكلة"
      },
      {
        "id": "section-4",
        "level": 2,
        "title": "ما الذي يوفّره المشروع؟"
      },
      {
        "id": "section-5",
        "level": 2,
        "title": "هيكل الملفات"
      },
      {
        "id": "section-6",
        "level": 2,
        "title": "بنية ملفات الربط الأمامي"
      },
      {
        "id": "section-7",
        "level": 3,
        "title": "أنواع المداخل"
      },
      {
        "id": "section-8",
        "level": 3,
        "title": "موضع يجتمع فيه الانقسام والاندماج"
      },
      {
        "id": "section-9",
        "level": 2,
        "title": "الخرائط العكسية"
      },
      {
        "id": "section-10",
        "level": 2,
        "title": "أسماء الرواة"
      },
      {
        "id": "section-11",
        "level": 2,
        "title": "بيانات الرواة"
      },
      {
        "id": "section-12",
        "level": 2,
        "title": "عدد آيات السور"
      },
      {
        "id": "section-13",
        "level": 2,
        "title": "طبقات الفروقات العلمية"
      },
      {
        "id": "section-14",
        "level": 3,
        "title": "dist/differences.json"
      },
      {
        "id": "section-15",
        "level": 3,
        "title": "data/book-boundary-primitives.json"
      },
      {
        "id": "section-16",
        "level": 3,
        "title": "dist/boundary-events.json"
      },
      {
        "id": "section-17",
        "level": 3,
        "title": "dist/differences-reconciliation.json"
      },
      {
        "id": "section-18",
        "level": 3,
        "title": "dist/classical-count-attestations.json"
      },
      {
        "id": "section-19",
        "level": 2,
        "title": "مصدر الحقيقة في النسخة الحالية"
      },
      {
        "id": "section-20",
        "level": 2,
        "title": "أنظمة العدّ الستة"
      },
      {
        "id": "section-21",
        "level": 2,
        "title": "التحقّق"
      },
      {
        "id": "section-22",
        "level": 2,
        "title": "المساهمة"
      },
      {
        "id": "section-23",
        "level": 2,
        "title": "المصدر"
      }
    ],
    "html": "<h1 id=\"section-1\">خريطة ربط أرقام الآيات بين القراءات</h1>\n<p><strong>مجموعة بيانات مفتوحة المصدر لربط أرقام الآيات بين أنظمة العدّ الستة المعتمدة في القراءات العشر.</strong></p>\n<p><a href=\"project-introduction\">Read this document in English</a></p>\n<p>للمدخل غير التقني المفصل ابدأ من: <a href=\"project-introduction-ar\"><code class=\"inline_code\">project-introduction.ar.md</code></a></p>\n<hr/>\n<h2 id=\"section-2\">تمهيد</h2>\n<p>القرآن الكريم نُقل بعشر قراءات متواترة، ولكلّ قراءة راويان، فيكون المجموع <strong>عشرين رواية</strong>. وكلّ قراءة تتبع أحد <strong>أنظمة العدّ الستة</strong> التي تحدّد مواضع فواصل الآيات.</p>\n<p>وتشترك بعض القراءات في نظام العدّ نفسه، لذلك فإن:</p>\n<ul class=\"doc_list\">\n<li>رواة القراءة الواحدة يشتركون في ترقيم الآيات</li>\n<li>والقراءات التي تتبع نظام عدّ واحد تشترك كذلك في هذا الترقيم</li>\n</ul>\n<h2 id=\"section-3\">المشكلة</h2>\n<p>لا يكفي الاعتماد على <code class=\"inline_code\">رقم السورة + رقم الآية</code> عند المقارنة بين المصاحف والقراءات؛ لأن مواضع الفواصل تختلف بين الأعداد.</p>\n<p>فقد تكون الآية مستقلة عند حفص، ثم تُدمج مع ما بعدها في عدّ آخر، أو تنقسم آية حفص الواحدة إلى آيتين أو أكثر في النظام المستهدف.</p>\n<h2 id=\"section-4\">ما الذي يوفّره المشروع؟</h2>\n<p>يوفّر المشروع ملفات JSON جاهزة للاستعمال من أجل:</p>\n<ul class=\"doc_list\">\n<li>الربط من <strong>حفص/الكوفي</strong> إلى سائر الأعداد</li>\n<li>الربط العكسي من العدد المستهدف إلى <strong>حفص/الكوفي</strong></li>\n<li>أسماء الرواة غير الكوفيين بوصفها واجهات مريحة لنفس البيانات</li>\n<li>عدد آيات كل سورة في كل نظام عدّ</li>\n<li>طبقة بدائية موافقة لكتب العدّ، تجمع مواضع الخلاف بحسب الموضع واللفظ والأنظمة التي تعدّه رأس آية</li>\n<li>ملف شواهد وتوثيق ملازم لهذه الطبقة العلمية، يضبط حالة التحقق والمراجع والمراجعة العلمية</li>\n<li>ملفات مراجعة علمية مولَّدة، منها مصفوفة شاملة وملفات مستقلة لكل عدد</li>\n<li>طبقة فروقات مشتقة من الخرائط نفسها، مع تقرير مصالحة بينها وبين المصدر اللفظي العلمي، وملف توثيق للجمل الكلية المختلف فيها</li>\n</ul>\n<h2 id=\"section-5\">هيكل الملفات</h2>\n<div dir=\"ltr\">\n<pre class=\"code_block\"><code class=\"language-text\">data/\n├── counting-systems.json              # أنظمة العدّ الستة (سجل محرَّر يدويًا)\n├── qiraat.json                        # القراءات العشر + 20 راوياً (سجل محرَّر يدويًا)\n├── book-boundary-primitives.json      # الطبقة العلمية الأصلية الموافقة لطريقة كتب العدّ\n└── book-boundary-evidence.json        # ملف الشواهد العلمي الملازم لكل موضع خلاف\n\ndist/\n├── differences.json                   # إسقاط لفظي مولَّد للتوافق مع البنية القديمة\n├── boundary-events.json               # فروقات عددية مطابقة تمامًا للخرائط المولَّدة\n├── differences-reconciliation.json    # تقرير مقارنة بين الملفين السابقين\n├── classical-count-attestations.json  # قرارات الجملة المعتمدة عند وجود خلاف في المجموع\n├── rawis/                             # 20 ملفًا مولَّدًا لبيانات الرواة\n├── mappings/by-counting-system/       # 10 ملفات (5 أعداد غير كوفية × اتجاهين)\n├── mappings/by-rawi/                  # 24 ملفًا (12 راوياً غير كوفي × اتجاهين)\n├── surah-counts/                      # 6 ملفات مولَّدة لعدد آيات السور\n└── review/                            # ملفات المراجعة العلمية المولَّدة\n</code></pre>\n<p>يحرِّر الباحثون <strong><code class=\"inline_code\">data/book-boundary-primitives.json</code></strong> و <strong><code class=\"inline_code\">data/book-boundary-evidence.json</code></strong> مباشرة، أمّا كل ما تحت <strong><code class=\"inline_code\">dist/</code></strong> فيُعاد توليده عبر <code class=\"inline_code\">npm run generate</code>.</p>\n</div>\n<h2 id=\"section-6\">بنية ملفات الربط الأمامي</h2>\n<p>تقع ملفات الربط الأمامي في:</p>\n<div dir=\"ltr\">\n<p><code class=\"inline_code\">dist/mappings/by-counting-system/kufi-to-{system}.json</code></p>\n</div>\n<p>ومثالها:</p>\n<div dir=\"ltr\">\n<pre class=\"code_block\"><code class=\"language-json\">{\n  \"_version\": \"0.1.0\",\n  \"_source\": \"kufi\",\n  \"_target\": \"madani-last\",\n  \"surahs\": {\n    \"1\": {\n      \"hafs_ayah_count\": 7,\n      \"target_ayah_count\": 7,\n      \"ayahs\": {\n        \"1\": { \"target_ayah\": 1, \"status\": \"merged\", \"merges_with_next\": true },\n        \"2\": { \"target_ayah\": 1, \"status\": \"mapped\" }\n      }\n    }\n  }\n}\n</code></pre>\n</div>\n<p>ويحمل كلّ جزء من السورة الحقول الآتية:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">hafs_ayah_count</code> — عدد آيات حفص/الكوفي</li>\n<li><code class=\"inline_code\">target_ayah_count</code> — عدد آيات النظام المستهدف</li>\n<li><code class=\"inline_code\">ayahs</code> — مدخل واحد لكل آية من آيات حفص في السورة</li>\n</ul>\n<h3 id=\"section-7\">أنواع المداخل</h3>\n<p><strong>1. mapped</strong> — تطابق مباشر آية بآية.</p>\n<div dir=\"ltr\">\n<pre class=\"code_block\"><code class=\"language-json\">{ \"target_ayah\": 4, \"status\": \"mapped\" }\n</code></pre>\n</div>\n<p><strong>2. merged</strong> — آية حفص هذه لا تنتهي آيةً مستقلة في النظام المستهدف، بل يستمر معناها إلى التغطية التي تشترك فيها الآية التالية.</p>\n<div dir=\"ltr\">\n<pre class=\"code_block\"><code class=\"language-json\">{ \"target_ayah\": 1, \"status\": \"merged\", \"merges_with_next\": true }\n</code></pre>\n</div>\n<p>انتبه: <code class=\"inline_code\">target_ayah</code> هنا <strong>ليس null</strong>، بل هو رقم الآية المستهدفة التي تغطّي هذا الموضع.</p>\n<p><strong>3. split</strong> — آية حفص الواحدة تنقسم إلى آيتين أو أكثر.</p>\n<div dir=\"ltr\">\n<pre class=\"code_block\"><code class=\"language-json\">{ \"target_ayah\": 5, \"status\": \"split\", \"splits_into\": [5, 6] }\n</code></pre>\n</div>\n<h3 id=\"section-8\">موضع يجتمع فيه الانقسام والاندماج</h3>\n<p>في مواضع قليلة يجتمع الأمران معًا. حينئذ يبقى المدخل من نوع <code class=\"inline_code\">split</code>، ويضاف إليه <code class=\"inline_code\">merges_with_next: true</code>.</p>\n<div dir=\"ltr\">\n<pre class=\"code_block\"><code class=\"language-json\">{ \"target_ayah\": 217, \"status\": \"split\", \"splits_into\": [217, 218], \"merges_with_next\": true }\n</code></pre>\n</div>\n<p>ومعناه أن آية حفص انقسمت أولًا، ثم إن <strong>آخر</strong> آية ناتجة منها تشترك أيضًا مع آية حفص التالية.</p>\n<h2 id=\"section-9\">الخرائط العكسية</h2>\n<p>تقع الخرائط العكسية في:</p>\n<div dir=\"ltr\">\n<p><code class=\"inline_code\">dist/mappings/by-counting-system/{system}-to-kufi.json</code></p>\n</div>\n<p>ومثال المدخل:</p>\n<div dir=\"ltr\">\n<pre class=\"code_block\"><code class=\"language-json\">{ \"hafs_ayah\": 1, \"hafs_ayahs\": [1, 2], \"status\": \"covers_multiple\" }\n</code></pre>\n</div>\n<p>وفيها حالتان أساسيتان:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">mapped</code> — آية مستهدفة تقابل آية حفص واحدة</li>\n<li><code class=\"inline_code\">covers_multiple</code> — آية مستهدفة واحدة تغطي عدّة آيات متتالية من حفص</li>\n</ul>\n<h2 id=\"section-10\">أسماء الرواة</h2>\n<p>تقع ملفات الواجهات المريحة بحسب اسم الراوي في:</p>\n<div dir=\"ltr\">\n<p><code class=\"inline_code\">dist/mappings/by-rawi/</code></p>\n</div>\n<p>مثل:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">hafs-to-warsh.json</code></li>\n<li><code class=\"inline_code\">warsh-to-hafs.json</code></li>\n<li><code class=\"inline_code\">hafs-to-ruways.json</code></li>\n<li><code class=\"inline_code\">ruways-to-hafs.json</code></li>\n</ul>\n<p>ولا تُنشأ هذه الملفات إلا للرواة <strong>غير الكوفيين</strong>، لأن الرواة الكوفيين يطابقون حفص في الترقيم.</p>\n<h2 id=\"section-11\">بيانات الرواة</h2>\n<p>تقع في:</p>\n<div dir=\"ltr\">\n<p><code class=\"inline_code\">dist/rawis/{rawi}.json</code></p>\n</div>\n<p>ومثالها:</p>\n<div dir=\"ltr\">\n<pre class=\"code_block\"><code class=\"language-json\">{\n  \"_rawi\": \"warsh\",\n  \"_qiraa\": \"nafi\",\n  \"_counting_system\": \"madani-last\",\n  \"_mushaf_id\": 4,\n  \"_mapping_file\": \"mappings/by-counting-system/kufi-to-madani-last.json\"\n}\n</code></pre>\n</div>\n<p>ملاحظتان:</p>\n<ul class=\"doc_list\">\n<li>قد تكون قيمة <code class=\"inline_code\">_mushaf_id</code> فارغة (<code class=\"inline_code\">null</code>) إذا لم يكن لهذا الراوي معرّف مصحف عام في البيانات الحالية.</li>\n<li>الرواة الكوفيون تكون قيمة <code class=\"inline_code\">_mapping_file</code> عندهم <code class=\"inline_code\">null</code> لأن ترقيمهم مطابق لحفص.</li>\n</ul>\n<h2 id=\"section-12\">عدد آيات السور</h2>\n<p>تقع ملفات عدد الآيات في:</p>\n<div dir=\"ltr\">\n<p><code class=\"inline_code\">dist/surah-counts/{system}.json</code></p>\n</div>\n<p>ومثالها:</p>\n<div dir=\"ltr\">\n<pre class=\"code_block\"><code class=\"language-json\">{\n  \"_counting_system\": \"madani-last\",\n  \"_total_ayahs\": 6214,\n  \"surahs\": {\n    \"1\": 7,\n    \"2\": 285,\n    \"3\": 200\n  }\n}\n</code></pre>\n</div>\n<h2 id=\"section-13\">طبقات الفروقات العلمية</h2>\n<h3 id=\"section-14\"><code class=\"inline_code\">dist/differences.json</code></h3>\n<p>هذه هي <strong>الطبقة اللفظية المولَّدة للتوافق</strong>، وفيها الكلمة أو الموضع الذي يُسقَط عليه الخلاف بعد توليده من الطبقة البدائية العلمية.</p>\n<div dir=\"ltr\">\n<pre class=\"code_block\"><code class=\"language-json\">{ \"surah\": 2, \"hafs_ayah\": 1, \"word\": \"الم\", \"type\": \"merge\" }\n</code></pre>\n</div>\n<p>تُستخدم حين تحتاج إلى البنية اللفظية القديمة لكل نظام عدّ كما تفهمها الأدوات الحالية.</p>\n<h3 id=\"section-15\"><code class=\"inline_code\">data/book-boundary-primitives.json</code></h3>\n<p>هذه هي <strong>الطبقة العلمية الأصلية الموافقة لطريقة كتب العدّ</strong>. فهي تجمع مواضع الخلاف بحسب الموضع والكلمة، وتذكر الأنظمة التي تعدُّ هذا الموضع <strong>رأس آية</strong>. وهي أيسر للمراجعة العلمية؛ لأنها تجيب مباشرة عن السؤال الطبيعي في كتب العدّ: <em>من يعدّ هذا الموضع رأس آية؟</em></p>\n<div dir=\"ltr\">\n<pre class=\"code_block\"><code class=\"language-json\">{\n  \"2\": {\n    \"219\": {\n      \"internal\": [\n        { \"word\": \"ينفقون\", \"counted_by\": [\"madani-first\"] }\n      ],\n      \"end\": { \"word\": \"تتفكرون\", \"counted_by\": [\"makki\", \"basri\", \"dimashqi\", \"kufi\"] }\n    }\n  }\n}\n</code></pre>\n</div>\n<p>ملاحظات:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">end</code> يعني أن موضع الخلاف يقع عند <strong>نهاية</strong> آية حفص/الكوفي المحددة</li>\n<li><code class=\"inline_code\">internal</code> يعني أن موضع الخلاف يقع <strong>داخل</strong> آية حفص/الكوفي، بعد الكلمة المذكورة</li>\n<li>النهايات الكوفية المتفق عليها ضمنًا لا تُذكر</li>\n<li>هذا الملف هو الآن <strong>المصدر العلمي التحريري الأصلي</strong> للمواضع المختلف فيها</li>\n<li>ويُولَّد منه <code class=\"inline_code\">differences.json</code> بوصفه إسقاطًا لفظيًا للتوافق</li>\n</ul>\n<p>انظر <code class=\"inline_code\">/docs/schema-book-boundary-primitives-v1</code> لبيان العقد الكامل.</p>\n<h3 id=\"section-16\"><code class=\"inline_code\">dist/boundary-events.json</code></h3>\n<p>هذه هي <strong>الطبقة العددية المطابقة للخرائط المشحونة</strong>.</p>\n<div dir=\"ltr\">\n<pre class=\"code_block\"><code class=\"language-json\">{ \"surah\": 2, \"hafs_ayah\": 1, \"type\": \"merge\", \"count\": 1 }\n</code></pre>\n</div>\n<p>استعملها إذا كنت تريد بيانات تضمن إعادة إنتاج الخرائط والعدّ الكلّي كما هو مشحون في المستودع.</p>\n<h3 id=\"section-17\"><code class=\"inline_code\">dist/differences-reconciliation.json</code></h3>\n<p>هذا ملف تقرير يوازن بين الطبقتين السابقةَين، ويُظهر مواضع الاتفاق والاختلاف سورةً سورةً وآيةً آيةً.</p>\n<h3 id=\"section-18\"><code class=\"inline_code\">dist/classical-count-attestations.json</code></h3>\n<p>يسجّل هذا الملف القرارات التحريرية الصريحة حين يكون للنظام العددي أكثر من جملة كلية منشورة بسبب مواضع مختلف فيها. والمدخل المحرَّر حاليًا خاصٌّ بالعدد المكي.</p>\n<h2 id=\"section-19\">مصدر الحقيقة في النسخة الحالية</h2>\n<p>في النسخة الحالية:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">book-boundary-primitives.json</code> هو <strong>المصدر العلمي التحريري الأصلي</strong></li>\n<li>ويُولَّد منه <code class=\"inline_code\">dist/differences.json</code> بوصفه إسقاطًا لفظيًا للتوافق مع البنية القديمة</li>\n<li>جميع الخرائط الأمامية لغير الكوفي تُولَّد من الطبقة البدائية العلمية الأصلية</li>\n<li>تجعل مرحلة التطبيع دلالةَ الاندماج مع الآية التالية صريحة في الخرائط الأمامية</li>\n<li>جميع الخرائط العكسية، وواجهات الرواة، وعدد آيات السور، و<code class=\"inline_code\">dist/boundary-events.json</code>، و<code class=\"inline_code\">dist/differences-reconciliation.json</code> تُولَّد من الخرائط الأمامية بعد التطبيع</li>\n<li>أمّا <code class=\"inline_code\">dist/classical-count-attestations.json</code> فيحفظ القرار الصريح للجملة المعتمدة إذا احتيج إلى إظهاره فوق الطبقة التشغيلية المولَّدة</li>\n</ul>\n<p>ولذلك فإن <code class=\"inline_code\">data/book-boundary-primitives.json</code> هو مصدر الحقيقة التحريري العلمي، بينما تعيش البيانات التشغيلية المولَّدة تحت <code class=\"inline_code\">dist/</code>.</p>\n<h2 id=\"section-20\">أنظمة العدّ الستة</h2>\n<table class=\"data_table\">\n<thead>\n<tr>\n<th>النظام</th>\n<th>العربية</th>\n<th style=\"text-align:right\">مجموع الآيات</th>\n<th>القراءات التابعة</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>الكوفي</td>\n<td>الكوفي</td>\n<td style=\"text-align:right\">6,236</td>\n<td>عاصم، حمزة، الكسائي، خلف</td>\n</tr>\n<tr>\n<td>المدني الأخير</td>\n<td>المدني الأخير</td>\n<td style=\"text-align:right\">6,214</td>\n<td>نافع</td>\n</tr>\n<tr>\n<td>المكي</td>\n<td>المكي</td>\n<td style=\"text-align:right\">6,219</td>\n<td>ابن كثير</td>\n</tr>\n<tr>\n<td>البصري</td>\n<td>البصري</td>\n<td style=\"text-align:right\">6,204</td>\n<td>أبو عمرو، يعقوب</td>\n</tr>\n<tr>\n<td>المدني الأول</td>\n<td>المدني الأول</td>\n<td style=\"text-align:right\">6,214</td>\n<td>أبو جعفر</td>\n</tr>\n<tr>\n<td>الدمشقي</td>\n<td>الدمشقي</td>\n<td style=\"text-align:right\">6,226</td>\n<td>ابن عامر</td>\n</tr>\n</tbody>\n</table>\n<h2 id=\"section-21\">التحقّق</h2>\n<div dir=\"ltr\">\n<pre class=\"code_block\"><code class=\"language-bash\">npm run generate\nnpm test\nnpm run test:api\n</code></pre>\n</div>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">npm run generate</code> يعيد توليد جميع الملفات المولَّدة تحت <code class=\"inline_code\">dist/</code>، بما فيها <code class=\"inline_code\">differences.json</code> وملف الجمل الكلية المعتمدة</li>\n<li><code class=\"inline_code\">npm test</code> يشغّل اختبارات البنية والاتساق محليًا</li>\n<li><code class=\"inline_code\">npm run test:api</code> يقارن ما أمكن من المصاحف العامة مع واجهة Quranpedia</li>\n</ul>\n<h2 id=\"section-22\">المساهمة</h2>\n<p>انظر <a href=\"https://github.com/quranpedia/qiraat-ayah-map/blob/main/CONTRIBUTING.md\" rel=\"noreferrer\" target=\"_blank\">CONTRIBUTING.md</a>.</p>\n<p>وعند التصحيح فرّق بين:</p>\n<ul class=\"doc_list\">\n<li><strong>تصحيح علمي في بدائيات الحدود</strong> داخل <code class=\"inline_code\">data/book-boundary-primitives.json</code></li>\n<li><strong>تصحيح في المولّدات أو التطبيع</strong> التي تُنتج الخرائط الأمامية</li>\n</ul>\n<p>ثم شغّل <code class=\"inline_code\">npm run generate</code> و<code class=\"inline_code\">npm test</code>.</p>\n<h2 id=\"section-23\">المصدر</h2>\n<p>المرجع الأساس: <strong>البيان في عدّ آي القرآن</strong> للإمام أبي عمرو الداني.</p>\n<p>كما تراعي النسخة الحالية التوافق العملي مع المصاحف العامة المتاحة في Quranpedia.</p>"
  },
  {
    "slug": "editorial-policy",
    "title": "Editorial policy",
    "language": "en",
    "direction": "ltr",
    "group": "curation",
    "sourcePath": "editorial-policy.md",
    "alternateSlug": null,
    "excerpt": "This project separates three questions that should not be conflated:",
    "headers": [
      {
        "id": "section-2",
        "level": 2,
        "title": "Canonical source files"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "Source hierarchy"
      },
      {
        "id": "section-4",
        "level": 3,
        "title": "Tier order"
      },
      {
        "id": "section-5",
        "level": 2,
        "title": "What belongs in the primitive file"
      },
      {
        "id": "section-6",
        "level": 2,
        "title": "What belongs in the evidence file"
      },
      {
        "id": "section-7",
        "level": 2,
        "title": "Verification statuses"
      },
      {
        "id": "section-8",
        "level": 3,
        "title": "uncited"
      },
      {
        "id": "section-9",
        "level": 3,
        "title": "secondary_only"
      },
      {
        "id": "section-10",
        "level": 3,
        "title": "primary_cited"
      },
      {
        "id": "section-11",
        "level": 3,
        "title": "primary_cited_and_reviewed"
      },
      {
        "id": "section-12",
        "level": 3,
        "title": "disputed"
      },
      {
        "id": "section-13",
        "level": 3,
        "title": "unresolved"
      },
      {
        "id": "section-14",
        "level": 2,
        "title": "Word-anchor normalization rules"
      },
      {
        "id": "section-15",
        "level": 2,
        "title": "Conflict handling"
      },
      {
        "id": "section-16",
        "level": 2,
        "title": "Totals vs. localizable boundaries"
      },
      {
        "id": "section-17",
        "level": 2,
        "title": "Review policy"
      },
      {
        "id": "section-18",
        "level": 2,
        "title": "Release gate"
      },
      {
        "id": "section-19",
        "level": 2,
        "title": "External curator bundles"
      }
    ],
    "html": "<h1 id=\"section-1\">Editorial policy</h1>\n<p>This project separates three questions that should not be conflated:</p>\n<ol class=\"doc_list\">\n<li><strong>What does the project claim?</strong><ul class=\"doc_list\">\n<li><code class=\"inline_code\">data/book-boundary-primitives.json</code></li>\n</ul>\n</li>\n<li><strong>Why does the project claim it?</strong><ul class=\"doc_list\">\n<li><code class=\"inline_code\">data/book-boundary-evidence.json</code></li>\n</ul>\n</li>\n<li><strong>What is generated from that claim?</strong><ul class=\"doc_list\">\n<li>everything under <code class=\"inline_code\">dist/</code></li>\n</ul>\n</li>\n</ol>\n<p>The generated mappings are never the scholarly proof. They are the reproducible consequence of the scholarly source layer.</p>\n<h2 id=\"section-2\">Canonical source files</h2>\n<p>The canonical human-maintained source layer is:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">data/counting-systems.json</code></li>\n<li><code class=\"inline_code\">data/qiraat.json</code></li>\n<li><code class=\"inline_code\">data/book-boundary-primitives.json</code></li>\n<li><code class=\"inline_code\">data/book-boundary-evidence.json</code></li>\n</ul>\n<p>Do not edit generated files under <code class=\"inline_code\">dist/</code> by hand.</p>\n<h2 id=\"section-3\">Source hierarchy</h2>\n<p>When recording evidence, use the strongest available source and label it with the appropriate tier.</p>\n<h3 id=\"section-4\">Tier order</h3>\n<ol class=\"doc_list\">\n<li><code class=\"inline_code\">primary</code><ul class=\"doc_list\">\n<li>direct statement in a classical <code class=\"inline_code\">ʿadad al-āy</code> source</li>\n</ul>\n</li>\n<li><code class=\"inline_code\">commentary</code><ul class=\"doc_list\">\n<li>authoritative explanation tied closely to a primary count text</li>\n</ul>\n</li>\n<li><code class=\"inline_code\">secondary</code><ul class=\"doc_list\">\n<li>later specialist count manuals or scholarly studies</li>\n</ul>\n</li>\n<li><code class=\"inline_code\">modern-reference</code><ul class=\"doc_list\">\n<li>modern summaries, catalogs, articles, or project notes</li>\n</ul>\n</li>\n<li><code class=\"inline_code\">api-check</code><ul class=\"doc_list\">\n<li>external consistency checks only; never sufficient on their own</li>\n</ul>\n</li>\n</ol>\n<h2 id=\"section-5\">What belongs in the primitive file</h2>\n<p><code class=\"inline_code\">data/book-boundary-primitives.json</code> stores only the scholarly claim:</p>\n<ul class=\"doc_list\">\n<li>the disputed location</li>\n<li>the anchor word</li>\n<li>whether the point is <code class=\"inline_code\">end</code> or <code class=\"inline_code\">internal</code></li>\n<li>which counting systems count that point as a ra's ayah</li>\n</ul>\n<p>Do not store quotations, bibliography, or review notes there.</p>\n<h2 id=\"section-6\">What belongs in the evidence file</h2>\n<p><code class=\"inline_code\">data/book-boundary-evidence.json</code> stores the support for the claim:</p>\n<ul class=\"doc_list\">\n<li>verification status</li>\n<li>evidence entries</li>\n<li>reviewer sign-off, if any</li>\n<li>short local notes</li>\n</ul>\n<p>Each evidence entry should record:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">tier</code></li>\n<li><code class=\"inline_code\">work</code></li>\n<li><code class=\"inline_code\">edition</code> if relevant</li>\n<li><code class=\"inline_code\">locator</code></li>\n<li><code class=\"inline_code\">supports</code></li>\n<li><code class=\"inline_code\">strength</code></li>\n<li>optional <code class=\"inline_code\">note</code></li>\n</ul>\n<p><code class=\"inline_code\">supports</code> names the counting systems from the paired primitive that this citation explicitly supports.</p>\n<h2 id=\"section-7\">Verification statuses</h2>\n<p>The allowed statuses are:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">uncited</code></li>\n<li><code class=\"inline_code\">secondary_only</code></li>\n<li><code class=\"inline_code\">primary_cited</code></li>\n<li><code class=\"inline_code\">primary_cited_and_reviewed</code></li>\n<li><code class=\"inline_code\">disputed</code></li>\n<li><code class=\"inline_code\">unresolved</code></li>\n</ul>\n<p>Use them as follows.</p>\n<h3 id=\"section-8\"><code class=\"inline_code\">uncited</code></h3>\n<p>Use when the primitive exists but no evidence has been entered yet.</p>\n<h3 id=\"section-9\"><code class=\"inline_code\">secondary_only</code></h3>\n<p>Use when the claim is currently supported only by commentary, later manuals, or modern references.</p>\n<h3 id=\"section-10\"><code class=\"inline_code\">primary_cited</code></h3>\n<p>Use when at least one primary citation has been entered and the evidence coverage supports the full <code class=\"inline_code\">counted_by</code> claim.</p>\n<h3 id=\"section-11\"><code class=\"inline_code\">primary_cited_and_reviewed</code></h3>\n<p>Use only when:</p>\n<ul class=\"doc_list\">\n<li>at least one primary citation has been entered</li>\n<li>the evidence covers the full <code class=\"inline_code\">counted_by</code> claim</li>\n<li>at least one reviewer has been recorded for that point</li>\n</ul>\n<h3 id=\"section-12\"><code class=\"inline_code\">disputed</code></h3>\n<p>Use when the sources or reviewers materially disagree.</p>\n<h3 id=\"section-13\"><code class=\"inline_code\">unresolved</code></h3>\n<p>Use when the point is known to need more work and should not yet be presented as settled.</p>\n<h2 id=\"section-14\">Word-anchor normalization rules</h2>\n<ul class=\"doc_list\">\n<li>Preserve the word form actually used as the local boundary anchor in the project</li>\n<li>Keep spacing normalized</li>\n<li>Do not add punctuation or verse numbers into the <code class=\"inline_code\">word</code> field</li>\n<li>Keep the primitive and evidence <code class=\"inline_code\">word</code> fields identical</li>\n<li>When a source is phrased differently from the project anchor, explain that in <code class=\"inline_code\">note</code></li>\n</ul>\n<h2 id=\"section-15\">Conflict handling</h2>\n<p>When sources disagree:</p>\n<ol class=\"doc_list\">\n<li>keep the primitive stable unless the better evidence clearly requires a change</li>\n<li>record both sides in the evidence file when appropriate</li>\n<li>mark the point <code class=\"inline_code\">disputed</code> or <code class=\"inline_code\">unresolved</code></li>\n<li>never hide disagreement by silently changing the generated mappings without updating source data</li>\n</ol>\n<h2 id=\"section-16\">Totals vs. localizable boundaries</h2>\n<p>A total ayah count can show that a system-level claim is wrong or incomplete, but it does not by itself localize the missing boundary.</p>\n<p>Do not add or remove a primitive boundary based only on a total.</p>\n<p>System-level total discussions belong in generated attestation files and review notes until the exact boundary is sourced.</p>\n<h2 id=\"section-17\">Review policy</h2>\n<p>A reviewer record should include, at minimum:</p>\n<ul class=\"doc_list\">\n<li>reviewer name</li>\n<li>reviewer role or description when appropriate</li>\n<li>optional date</li>\n<li>optional note</li>\n</ul>\n<p>Project labels should follow this rule:</p>\n<ul class=\"doc_list\">\n<li><strong>structurally valid</strong>: local validation passes</li>\n<li><strong>reproducible</strong>: <code class=\"inline_code\">npm run generate</code> followed by <code class=\"inline_code\">npm test</code> passes cleanly</li>\n<li><strong>scholarly reviewed</strong>: every primitive is at least <code class=\"inline_code\">primary_cited_and_reviewed</code>, or explicitly marked <code class=\"inline_code\">disputed</code> / <code class=\"inline_code\">unresolved</code></li>\n</ul>\n<h2 id=\"section-18\">Release gate</h2>\n<p>A release can be called <strong>scholarly verified</strong> only when:</p>\n<ul class=\"doc_list\">\n<li>the source layer validates</li>\n<li>the generated layer round-trips cleanly</li>\n<li>every primitive has evidence status tracked</li>\n<li>every non-settled point is openly marked</li>\n<li>reviewer packets under <code class=\"inline_code\">dist/review/</code> are up to date</li>\n</ul>\n<h2 id=\"section-19\">External curator bundles</h2>\n<p>Optional structured source bundles may be used to accelerate evidence entry, but they must never become hidden build dependencies.</p>\n<ul class=\"doc_list\">\n<li>use them to propose or apply updates to <code class=\"inline_code\">data/book-boundary-evidence.json</code></li>\n<li>when a single supplied bundle contains both a matn and its sharḥ, record them as separate evidence items rather than collapsing them into one witness</li>\n<li>keep the final scholarly judgment in the checked-in evidence file, not in an external temporary report</li>\n<li>when a bundle conflicts with the current primitive, prefer an explicit <code class=\"inline_code\">disputed</code> / <code class=\"inline_code\">unresolved</code> note over silent harmonization</li>\n</ul>"
  },
  {
    "slug": "methodology",
    "title": "Methodology",
    "language": "en",
    "direction": "ltr",
    "group": "curation",
    "sourcePath": "methodology.md",
    "alternateSlug": null,
    "excerpt": "New here? Read project-introduction.md first, or project-introduction.ar.md for the Arabic companion. This file describes the technical model after that broader introduction.",
    "headers": [
      {
        "id": "section-2",
        "level": 2,
        "title": "Core model"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "Derivation flow"
      },
      {
        "id": "section-4",
        "level": 2,
        "title": "Why this model is reviewable"
      },
      {
        "id": "section-5",
        "level": 2,
        "title": "Why generated mappings still matter"
      },
      {
        "id": "section-6",
        "level": 2,
        "title": "Validation gates"
      },
      {
        "id": "section-7",
        "level": 3,
        "title": "1. Source validation"
      },
      {
        "id": "section-8",
        "level": 3,
        "title": "2. Derivation validation"
      },
      {
        "id": "section-9",
        "level": 3,
        "title": "3. Review validation"
      },
      {
        "id": "section-10",
        "level": 2,
        "title": "Review outputs"
      },
      {
        "id": "section-11",
        "level": 2,
        "title": "Site deployment note"
      },
      {
        "id": "section-12",
        "level": 2,
        "title": "Source-witness pass"
      }
    ],
    "html": "<blockquote>\n<p>New here? Read <a href=\"project-introduction\"><code class=\"inline_code\">project-introduction.md</code></a> first, or <a href=\"project-introduction-ar\"><code class=\"inline_code\">project-introduction.ar.md</code></a> for the Arabic companion. This file describes the technical model after that broader introduction.</p>\n</blockquote>\n<h1 id=\"section-1\">Methodology</h1>\n<h2 id=\"section-2\">Core model</h2>\n<p>The project models disputed Quran ayah boundaries in a book-aligned way.</p>\n<p>The canonical scholarly claim lives in <code class=\"inline_code\">data/book-boundary-primitives.json</code>:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">end</code> = a disputed boundary at the end of a Kufan/Hafs ayah</li>\n<li><code class=\"inline_code\">internal</code> = a disputed boundary inside that Kufan/Hafs ayah</li>\n<li><code class=\"inline_code\">counted_by</code> = the counting systems that count the point as a ra's ayah</li>\n</ul>\n<p>The evidence sidecar lives in <code class=\"inline_code\">data/book-boundary-evidence.json</code> and tracks:</p>\n<ul class=\"doc_list\">\n<li>verification status</li>\n<li>citations</li>\n<li>reviewer notes</li>\n</ul>\n<p>Everything else is generated.</p>\n<h2 id=\"section-3\">Derivation flow</h2>\n<p><code class=\"inline_code\">npm run generate</code> performs these steps:</p>\n<ol class=\"doc_list\">\n<li>normalize the primitive source layer</li>\n<li>normalize and synchronize the evidence sidecar</li>\n<li>generate the legacy compatibility projection (<code class=\"inline_code\">dist/differences.json</code>)</li>\n<li>generate forward mappings</li>\n<li>normalize forward mappings</li>\n<li>generate reverse mappings</li>\n<li>generate boundary-event and reconciliation layers</li>\n<li>generate rawi metadata and surah counts</li>\n<li>generate classical total attestation notes</li>\n<li>generate scholar-review packets under <code class=\"inline_code\">dist/review/</code></li>\n<li>generate the checked-in <code class=\"inline_code\">البيان</code> cross-reference report under <code class=\"inline_code\">dist/review/</code></li>\n<li>generate the SPA UI contract under <code class=\"inline_code\">site/src/lib/data/generated/</code></li>\n</ol>\n<h2 id=\"section-4\">Why this model is reviewable</h2>\n<p>Traditional books of <code class=\"inline_code\">ʿadad al-āy</code> are naturally read as boundary claims, not as reverse maps or array arithmetic.</p>\n<p>The project therefore asks the scholar-facing question directly:</p>\n<ul class=\"doc_list\">\n<li>Is this point a ra's ayah in this counting system?</li>\n</ul>\n<p>That is easier to verify than reviewing large expanded mapping files.</p>\n<h2 id=\"section-5\">Why generated mappings still matter</h2>\n<p>The mapping files remain important for downstream consumers:</p>\n<ul class=\"doc_list\">\n<li>apps that convert ayah numbers across rawis and counting systems</li>\n<li>reverse lookup workflows</li>\n<li>public API comparisons</li>\n<li>surah-count tables</li>\n</ul>\n<p>But they are reproducible outputs, not the primary scholarly document.</p>\n<h2 id=\"section-6\">Validation gates</h2>\n<p>The project now has three validation gates.</p>\n<h3 id=\"section-7\">1. Source validation</h3>\n<p>Checks the canonical files under <code class=\"inline_code\">data/</code> for schema, alignment, ordering, and evidence coverage rules.</p>\n<h3 id=\"section-8\">2. Derivation validation</h3>\n<p>Checks that generated forward and reverse mappings, surah counts, and rawi aliases are fully consistent.</p>\n<h3 id=\"section-9\">3. Review validation</h3>\n<p>Checks that review packets are in sync with the source layer and that evidence statuses are represented accurately in generated review artifacts.</p>\n<h2 id=\"section-10\">Review outputs</h2>\n<p>The generated review layer under <code class=\"inline_code\">dist/review/</code> is intended for scholar outreach and UI work. The site consumes a reduced JSON contract generated into <code class=\"inline_code\">site/src/lib/data/generated/site-data.json</code> for fast client-side exploration:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">review-data.json</code> — frontend-friendly flattened rows</li>\n<li><code class=\"inline_code\">master-matrix.csv</code> — spreadsheet review matrix</li>\n<li><code class=\"inline_code\">systems/*.md</code> — system-by-system packets</li>\n<li><code class=\"inline_code\">totals.md</code> — totals sheet</li>\n<li><code class=\"inline_code\">open-questions.md</code> — unresolved or unreviewed claims</li>\n<li><code class=\"inline_code\">al-bayan-cross-reference.{json,md}</code> — exact-match and exception tracking against the checked-in structured <code class=\"inline_code\">البيان</code> witness</li>\n</ul>\n<h2 id=\"section-11\">Site deployment note</h2>\n<p>The SPA is deployed as a static GitHub Pages artifact. The frontend build must receive the Pages base path, and the built output must include a <code class=\"inline_code\">404.html</code> fallback so client-side routes can recover on direct loads.</p>\n<h2 id=\"section-12\">Source-witness pass</h2>\n<p>The repo now checks in its current structured witness frontier under <code class=\"inline_code\">sources/</code>.</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">sources/al_bayan</code> provides the current primary structured frontier for <code class=\"inline_code\">البيان</code></li>\n<li><code class=\"inline_code\">sources/nafais</code> provides the current poem/commentary frontier for <code class=\"inline_code\">الفرائد الحسان</code> and <code class=\"inline_code\">نفائس البيان</code></li>\n</ul>\n<p>These witnesses still do not replace the canonical authored claim layer in <code class=\"inline_code\">data/</code>, but they are now first-class curator aids. The al-Dānī witness feeds <code class=\"inline_code\">primary</code> entries and also generates a cross-reference report under <code class=\"inline_code\">dist/review/</code>; the embedded <code class=\"inline_code\">الفرائد الحسان</code> poem segments from the al-Qāḍī bundle feed direct <code class=\"inline_code\">secondary</code> entries; and the bundled <code class=\"inline_code\">نفائس البيان</code> commentary segments feed <code class=\"inline_code\">commentary</code> entries. The full curator workflow is documented in <code class=\"inline_code\">/docs/source-bundle-workflow</code>.</p>"
  },
  {
    "slug": "reviewer-guide-ar",
    "title": "دليل المراجع العلمي",
    "language": "ar",
    "direction": "rtl",
    "group": "curation",
    "sourcePath": "reviewer-guide.ar.md",
    "alternateSlug": null,
    "excerpt": "هذا المشروع لا يطلب منكم مراجعة الخرائط الرقمية الكبيرة مباشرة، بل يطلب التحقق من مواضع رؤوس الآي المختلف فيها .",
    "headers": [
      {
        "id": "section-2",
        "level": 2,
        "title": "الملفات التي تهم المراجع"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "معنى الحقول"
      },
      {
        "id": "section-4",
        "level": 3,
        "title": "end"
      },
      {
        "id": "section-5",
        "level": 3,
        "title": "internal"
      },
      {
        "id": "section-6",
        "level": 3,
        "title": "counted_by"
      },
      {
        "id": "section-7",
        "level": 2,
        "title": "ماذا نطلب من المراجع؟"
      },
      {
        "id": "section-8",
        "level": 2,
        "title": "كيف نسجل التوثيق؟"
      },
      {
        "id": "section-9",
        "level": 2,
        "title": "حالات التحقق"
      },
      {
        "id": "section-10",
        "level": 2,
        "title": "ملاحظة مهمة"
      }
    ],
    "html": "<h1 id=\"section-1\">دليل المراجع العلمي</h1>\n<p>هذا المشروع لا يطلب منكم مراجعة الخرائط الرقمية الكبيرة مباشرة، بل يطلب التحقق من <strong>مواضع رؤوس الآي المختلف فيها</strong>.</p>\n<h2 id=\"section-2\">الملفات التي تهم المراجع</h2>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">data/book-boundary-primitives.json</code><ul class=\"doc_list\">\n<li>هذا هو <strong>الأصل العلمي المختصر</strong></li>\n</ul>\n</li>\n<li><code class=\"inline_code\">data/book-boundary-evidence.json</code><ul class=\"doc_list\">\n<li>هذا هو <strong>ملف الشواهد والتوثيق</strong></li>\n</ul>\n</li>\n<li><code class=\"inline_code\">dist/review/master-matrix.csv</code><ul class=\"doc_list\">\n<li>جدول مراجعة شامل</li>\n</ul>\n</li>\n<li><code class=\"inline_code\">dist/review/systems/*.md</code><ul class=\"doc_list\">\n<li>ملفات مراجعة مرتبة بحسب كل عدد</li>\n</ul>\n</li>\n</ul>\n<h2 id=\"section-3\">معنى الحقول</h2>\n<h3 id=\"section-4\"><code class=\"inline_code\">end</code></h3>\n<p>يعني أن موضع الخلاف عند <strong>آخر الآية الكوفية / الحفصية المذكورة</strong>.</p>\n<h3 id=\"section-5\"><code class=\"inline_code\">internal</code></h3>\n<p>يعني أن موضع الخلاف <strong>داخل الآية الكوفية / الحفصية المذكورة</strong> بعد الكلمة المحددة.</p>\n<h3 id=\"section-6\"><code class=\"inline_code\">counted_by</code></h3>\n<p>هي الأعداد التي <strong>تعد هذا الموضع رأس آية</strong>.</p>\n<h2 id=\"section-7\">ماذا نطلب من المراجع؟</h2>\n<p>عند كل موضع نريد التحقق من أربعة أمور:</p>\n<ol class=\"doc_list\">\n<li>هل موضع الوقف صحيح؟</li>\n<li>هل الكلمة المعتمدة للربط صحيحة؟</li>\n<li>هل هذا الموضع <code class=\"inline_code\">end</code> أم <code class=\"inline_code\">internal</code>؟</li>\n<li>هل نسبة الموضع إلى العدد / الأعداد المذكورة صحيحة؟</li>\n</ol>\n<h2 id=\"section-8\">كيف نسجل التوثيق؟</h2>\n<p>في <code class=\"inline_code\">data/book-boundary-evidence.json</code> يمكن إضافة:</p>\n<ul class=\"doc_list\">\n<li>اسم المصدر</li>\n<li>الطبعة أو المحقق إن لزم</li>\n<li>الموضع: صفحة / باب / فصل / بيت</li>\n<li>نوع الدليل: مباشر أو مستنبط</li>\n<li>الأعداد التي يسندها هذا النقل</li>\n<li>ملاحظة مختصرة عند الحاجة</li>\n</ul>\n<h2 id=\"section-9\">حالات التحقق</h2>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">uncited</code></li>\n<li><code class=\"inline_code\">secondary_only</code></li>\n<li><code class=\"inline_code\">primary_cited</code></li>\n<li><code class=\"inline_code\">primary_cited_and_reviewed</code></li>\n<li><code class=\"inline_code\">disputed</code></li>\n<li><code class=\"inline_code\">unresolved</code></li>\n</ul>\n<p>المطلوب النهائي للمشروع هو أن يصل كل موضع إلى:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">primary_cited_and_reviewed</code></li>\n</ul>\n<p>أو يبقى معلَّماً بوضوح بأنه:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">disputed</code></li>\n<li><code class=\"inline_code\">unresolved</code></li>\n</ul>\n<h2 id=\"section-10\">ملاحظة مهمة</h2>\n<p>الخرائط المولدة في <code class=\"inline_code\">dist/</code> ليست هي الأصل العلمي، وإنما هي <strong>نتيجة</strong> للبيانات الأصلية. لذلك فالمراجعة العلمية تكون على <strong>مواضع رؤوس الآي</strong> وشواهدها، لا على الملفات المشتقة فقط.</p>"
  },
  {
    "slug": "source-catalog",
    "title": "Source catalog",
    "language": "en",
    "direction": "ltr",
    "group": "sources",
    "sourcePath": "source-catalog.md",
    "alternateSlug": null,
    "excerpt": "This catalog names the source families the project expects to cite in data/book-boundary-evidence.json .",
    "headers": [
      {
        "id": "section-2",
        "level": 2,
        "title": "Primary count sources"
      },
      {
        "id": "section-3",
        "level": 3,
        "title": "البيان في عد آي القرآن"
      },
      {
        "id": "section-4",
        "level": 3,
        "title": "ناظمة الزهر"
      },
      {
        "id": "section-5",
        "level": 2,
        "title": "Commentary on primary sources"
      },
      {
        "id": "section-6",
        "level": 3,
        "title": "Commentaries and explanatory works on ناظمة الزهر"
      },
      {
        "id": "section-7",
        "level": 2,
        "title": "Secondary scholarly manuals"
      },
      {
        "id": "section-8",
        "level": 3,
        "title": "جمال القراء / أقوى العدد"
      },
      {
        "id": "section-9",
        "level": 3,
        "title": "Specialized count treatises by regional school"
      },
      {
        "id": "section-10",
        "level": 3,
        "title": "الفرائد الحسان في عد آي القرآن"
      },
      {
        "id": "section-11",
        "level": 2,
        "title": "Modern references"
      },
      {
        "id": "section-12",
        "level": 2,
        "title": "External consistency checks"
      },
      {
        "id": "section-13",
        "level": 2,
        "title": "Working bundle witnesses"
      },
      {
        "id": "section-14",
        "level": 3,
        "title": "Structured البيان witness under sources/al_bayan"
      },
      {
        "id": "section-15",
        "level": 3,
        "title": "الفرائد الحسان / نفائس البيان witness under sources/nafais"
      }
    ],
    "html": "<h1 id=\"section-1\">Source catalog</h1>\n<p>This catalog names the source families the project expects to cite in <code class=\"inline_code\">data/book-boundary-evidence.json</code>.</p>\n<p>Use the exact edition, editor, and locator in the evidence file whenever possible.</p>\n<h2 id=\"section-2\">Primary count sources</h2>\n<h3 id=\"section-3\"><code class=\"inline_code\">البيان في عد آي القرآن</code></h3>\n<p>Primary prose source for the canonical count traditions and many local boundary reports.</p>\n<p>Suggested evidence tier:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">primary</code></li>\n</ul>\n<h3 id=\"section-4\"><code class=\"inline_code\">ناظمة الزهر</code></h3>\n<p>Primary poetic source widely used in the count tradition.</p>\n<p>Suggested evidence tier:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">primary</code></li>\n</ul>\n<h2 id=\"section-5\">Commentary on primary sources</h2>\n<h3 id=\"section-6\">Commentaries and explanatory works on <code class=\"inline_code\">ناظمة الزهر</code></h3>\n<p>Use when the primary poem needs decoding, symbol expansion, or local explanation.</p>\n<p>Suggested evidence tier:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">commentary</code></li>\n</ul>\n<h2 id=\"section-7\">Secondary scholarly manuals</h2>\n<h3 id=\"section-8\"><code class=\"inline_code\">جمال القراء</code> / <code class=\"inline_code\">أقوى العدد</code></h3>\n<p>Later specialist count manual family useful for corroboration and comparison.</p>\n<p>Suggested evidence tier:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">secondary</code></li>\n</ul>\n<h3 id=\"section-9\">Specialized count treatises by regional school</h3>\n<p>Examples include dedicated manuals for Basran, Makkan, or other counting traditions.</p>\n<p>Suggested evidence tier:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">secondary</code></li>\n</ul>\n<h3 id=\"section-10\"><code class=\"inline_code\">الفرائد الحسان في عد آي القرآن</code></h3>\n<p>A later didactic count poem by <code class=\"inline_code\">عبد الفتاح القاضي</code>. It is not a primary classical witness on the same footing as <code class=\"inline_code\">البيان</code>, but it is a strong direct later manual and can be cited as a <code class=\"inline_code\">secondary</code> witness where its local wording and school attributions are clear.</p>\n<p>Suggested evidence tier:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">secondary</code></li>\n</ul>\n<h2 id=\"section-11\">Modern references</h2>\n<p>Use modern summaries, catalogs, project notes, and articles only as support or navigation aids.</p>\n<p>Suggested evidence tier:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">modern-reference</code></li>\n</ul>\n<h2 id=\"section-12\">External consistency checks</h2>\n<p>Public APIs, website tables, and machine-readable sources may be recorded as cross-checks.</p>\n<p>Suggested evidence tier:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">api-check</code></li>\n</ul>\n<p>These are never sufficient on their own for a final scholarly claim.</p>\n<h2 id=\"section-13\">Working bundle witnesses</h2>\n<p>These are curator-facing structured witnesses checked into the repo under <code class=\"inline_code\">sources/</code>. They do not replace the canonical authored claim layer in <code class=\"inline_code\">data/</code>, but they now serve two concrete roles:</p>\n<ul class=\"doc_list\">\n<li>accelerating evidence entry into <code class=\"inline_code\">data/book-boundary-evidence.json</code></li>\n<li>generating scholar-facing cross-reference reports under <code class=\"inline_code\">dist/review/</code></li>\n</ul>\n<h3 id=\"section-14\">Structured <code class=\"inline_code\">البيان</code> witness under <code class=\"inline_code\">sources/al_bayan</code></h3>\n<p>Use as the primary-ingestion aid wherever the extracted surah entry preserves a direct disputed-boundary phrase and school attribution.</p>\n<p>Current checked-in frontier:</p>\n<ul class=\"doc_list\">\n<li>pilot for surah 1</li>\n<li>structured surah entries through surah 13</li>\n</ul>\n<p>Generated project artifact:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">dist/review/al-bayan-cross-reference.{json,md}</code></li>\n</ul>\n<h3 id=\"section-15\"><code class=\"inline_code\">الفرائد الحسان</code> / <code class=\"inline_code\">نفائس البيان</code> witness under <code class=\"inline_code\">sources/nafais</code></h3>\n<p>This checked-in bundle carries two usable layers:</p>\n<ul class=\"doc_list\">\n<li>poem (<code class=\"inline_code\">kind: poem</code>) segments from <code class=\"inline_code\">الفرائد الحسان</code>, which can be cited as direct <code class=\"inline_code\">secondary</code> support</li>\n<li>commentary (<code class=\"inline_code\">kind: commentary</code> / <code class=\"inline_code\">technical_note</code>) segments from <code class=\"inline_code\">نفائس البيان</code>, which can be cited as <code class=\"inline_code\">commentary</code> support</li>\n</ul>\n<p>Use it especially where the current <code class=\"inline_code\">البيان</code> frontier is incomplete, compressed, or internally nuanced.</p>"
  },
  {
    "slug": "source-bundle-workflow",
    "title": "Source-bundle workflow",
    "language": "en",
    "direction": "ltr",
    "group": "sources",
    "sourcePath": "source-bundle-workflow.md",
    "alternateSlug": null,
    "excerpt": "This project keeps its canonical scholarly claim layer in:",
    "headers": [
      {
        "id": "section-2",
        "level": 2,
        "title": "The supplied bundles play three evidentiary roles"
      },
      {
        "id": "section-3",
        "level": 3,
        "title": "1. البيان في عدّ آي القرآن bundle"
      },
      {
        "id": "section-4",
        "level": 3,
        "title": "2. الفرائد الحسان في عدّ آي القرآن within the القاضي bundle"
      },
      {
        "id": "section-5",
        "level": 3,
        "title": "3. نفائس البيان — شرح الفرائد الحسان within the same القاضي bundle"
      },
      {
        "id": "section-6",
        "level": 2,
        "title": "Current decision tree"
      },
      {
        "id": "section-7",
        "level": 3,
        "title": "Exact primary alignment"
      },
      {
        "id": "section-8",
        "level": 3,
        "title": "Later-manual alignment without current primary coverage"
      },
      {
        "id": "section-9",
        "level": 3,
        "title": "Primary / later-manual tension"
      },
      {
        "id": "section-10",
        "level": 2,
        "title": "Concrete examples from the current pass"
      },
      {
        "id": "section-11",
        "level": 3,
        "title": "3:92 — تحبون"
      },
      {
        "id": "section-12",
        "level": 3,
        "title": "3:97 — إبراهيم"
      },
      {
        "id": "section-13",
        "level": 3,
        "title": "6:73 — فيكون"
      },
      {
        "id": "section-14",
        "level": 2,
        "title": "Import command"
      },
      {
        "id": "section-15",
        "level": 2,
        "title": "What this importer deliberately does not do"
      }
    ],
    "html": "<h1 id=\"section-1\">Source-bundle workflow</h1>\n<p>This project keeps its canonical scholarly claim layer in:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">data/book-boundary-primitives.json</code></li>\n<li><code class=\"inline_code\">data/book-boundary-evidence.json</code></li>\n</ul>\n<p>Structured source witnesses now live under <code class=\"inline_code\">sources/</code> and are used in two ways:</p>\n<ul class=\"doc_list\">\n<li>to advance <code class=\"inline_code\">data/book-boundary-evidence.json</code></li>\n<li>to generate scholar-facing cross-reference artifacts under <code class=\"inline_code\">dist/review/</code></li>\n</ul>\n<p>They still do <strong>not</strong> replace the canonical authored claim layer under <code class=\"inline_code\">data/</code>.</p>\n<h2 id=\"section-2\">The supplied bundles play three evidentiary roles</h2>\n<h3 id=\"section-3\">1. <code class=\"inline_code\">البيان في عدّ آي القرآن</code> bundle</h3>\n<p>Use the structured <code class=\"inline_code\">al_bayan_*surah_*.json</code> files as the <strong>primary-source ingestion layer</strong>.</p>\n<p>Best use cases:</p>\n<ul class=\"doc_list\">\n<li>exact phrase-level matches against a primitive point</li>\n<li>direct school-level support for <code class=\"inline_code\">counted_by</code></li>\n<li>strong <code class=\"inline_code\">primary</code> citations for surahs already covered by the structured batch</li>\n</ul>\n<p>Current checked-in coverage in <code class=\"inline_code\">sources/al_bayan</code>:</p>\n<ul class=\"doc_list\">\n<li>pilot for surah 1</li>\n<li>surahs 2–13 in structured form</li>\n</ul>\n<p>Generated cross-reference artifact:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">dist/review/al-bayan-cross-reference.{json,md}</code></li>\n</ul>\n<p>Project rule:</p>\n<ul class=\"doc_list\">\n<li>when the bundle gives an exact phrase-level match and the imported school set matches the current primitive, promote the point to <code class=\"inline_code\">primary_cited</code></li>\n</ul>\n<h3 id=\"section-4\">2. <code class=\"inline_code\">الفرائد الحسان في عدّ آي القرآن</code> within the القاضي bundle</h3>\n<p>The supplied القاضي bundle is not commentary only. It also embeds <code class=\"inline_code\">kind: poem</code> segments from the matn of\n<code class=\"inline_code\">الفرائد الحسان</code>.</p>\n<p>Use those poem segments as a <strong>direct later-manual witness</strong>.</p>\n<p>Best use cases:</p>\n<ul class=\"doc_list\">\n<li>strengthening already-covered points with a second explicit count-book witness</li>\n<li>preserving the exact compact count phrasing used by the poem</li>\n<li>giving reviewers a direct matn-level citation separate from the sharḥ</li>\n</ul>\n<p>Project rule:</p>\n<ul class=\"doc_list\">\n<li>cite these poem segments as <code class=\"inline_code\">tier: secondary</code></li>\n<li>do <strong>not</strong> treat them as equivalent to the primary classical witness of <code class=\"inline_code\">البيان</code></li>\n</ul>\n<p>Current bundle frontier for poem support:</p>\n<ul class=\"doc_list\">\n<li>disputed points through surah 26</li>\n</ul>\n<h3 id=\"section-5\">3. <code class=\"inline_code\">نفائس البيان — شرح الفرائد الحسان</code> within the same القاضي bundle</h3>\n<p>Use the <code class=\"inline_code\">kind: commentary</code> and <code class=\"inline_code\">kind: technical_note</code> segments as the <strong>commentary and adjudication layer</strong>.</p>\n<p>Best use cases:</p>\n<ul class=\"doc_list\">\n<li>points not yet covered by the current <code class=\"inline_code\">البيان</code> batch</li>\n<li>places where the commentator explicitly names the counted and omitted schools</li>\n<li>occurrence qualification such as “the first” / “the second”</li>\n<li>narrator-level or Madani-internal nuance that helps explain why a six-system projection is difficult</li>\n<li>reviewer-facing prose that is easier to audit than raw entry compression</li>\n</ul>\n<p>Project rule:</p>\n<ul class=\"doc_list\">\n<li>when the commentary supports the current primitive and no direct primary witness has been entered yet, keep the point <code class=\"inline_code\">secondary_only</code></li>\n<li>when commentary and current primary ingestion materially diverge, keep the point <code class=\"inline_code\">disputed</code> or <code class=\"inline_code\">unresolved</code> rather than forcing a silent harmonization</li>\n</ul>\n<p>Current bundle frontier for commentary support:</p>\n<ul class=\"doc_list\">\n<li>disputed points through surah 26</li>\n</ul>\n<h2 id=\"section-6\">Current decision tree</h2>\n<h3 id=\"section-7\">Exact primary alignment</h3>\n<p>Result:</p>\n<ul class=\"doc_list\">\n<li>add a <code class=\"inline_code\">primary</code> evidence entry from <code class=\"inline_code\">البيان</code></li>\n<li>keep or upgrade the point to <code class=\"inline_code\">primary_cited</code></li>\n<li>optionally add a <code class=\"inline_code\">secondary</code> entry from <code class=\"inline_code\">الفرائد الحسان</code></li>\n<li>optionally add a <code class=\"inline_code\">commentary</code> entry from <code class=\"inline_code\">نفائس البيان</code></li>\n</ul>\n<h3 id=\"section-8\">Later-manual alignment without current primary coverage</h3>\n<p>Result:</p>\n<ul class=\"doc_list\">\n<li>add a <code class=\"inline_code\">secondary</code> evidence entry from <code class=\"inline_code\">الفرائد الحسان</code> where the poem segment is clear</li>\n<li>add a <code class=\"inline_code\">commentary</code> evidence entry from <code class=\"inline_code\">نفائس البيان</code> where the sharḥ is available</li>\n<li>mark the point <code class=\"inline_code\">secondary_only</code></li>\n<li>leave a note if the current <code class=\"inline_code\">البيان</code> bundle simply does not cover that point yet</li>\n</ul>\n<h3 id=\"section-9\">Primary / later-manual tension</h3>\n<p>Result:</p>\n<ul class=\"doc_list\">\n<li>keep the supporting <code class=\"inline_code\">secondary</code> / <code class=\"inline_code\">commentary</code> entries</li>\n<li>do <strong>not</strong> coerce the point into <code class=\"inline_code\">primary_cited</code></li>\n<li>mark the point <code class=\"inline_code\">disputed</code> or <code class=\"inline_code\">unresolved</code></li>\n<li>record the reason in the point note</li>\n</ul>\n<h2 id=\"section-10\">Concrete examples from the current pass</h2>\n<h3 id=\"section-11\"><code class=\"inline_code\">3:92</code> — <code class=\"inline_code\">تحبون</code></h3>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">الفرائد الحسان</code> and <code class=\"inline_code\">نفائس البيان</code> support the current project reading through the Makkan, Dimashqi, and the Madani line represented here by Shaybah</li>\n<li>the supplied <code class=\"inline_code\">البيان</code> batch carries an internal note about Madani split transmission at this location</li>\n<li>the project therefore keeps the point visible but marks it <code class=\"inline_code\">disputed</code></li>\n</ul>\n<h3 id=\"section-12\"><code class=\"inline_code\">3:97</code> — <code class=\"inline_code\">إبراهيم</code></h3>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">الفرائد الحسان</code> and <code class=\"inline_code\">نفائس البيان</code> explicitly support the current project primitive</li>\n<li>the current <code class=\"inline_code\">البيان</code> batch does not yet expose a matching primary item for this point</li>\n<li>the project therefore keeps it <code class=\"inline_code\">secondary_only</code></li>\n</ul>\n<h3 id=\"section-13\"><code class=\"inline_code\">6:73</code> — <code class=\"inline_code\">فيكون</code></h3>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">الفرائد الحسان</code> and <code class=\"inline_code\">نفائس البيان</code> support the current project primitive</li>\n<li>the supplied <code class=\"inline_code\">البيان</code> batch instead surfaces the second <code class=\"inline_code\">إلى صراط مستقيم</code> after <code class=\"inline_code\">كن فيكون</code> together with <code class=\"inline_code\">دينا قيما</code></li>\n<li>the project therefore keeps the point <code class=\"inline_code\">disputed</code> until the primary witness is reconciled directly</li>\n</ul>\n<h2 id=\"section-14\">Import command</h2>\n<p>Dry run:</p>\n<pre class=\"code_block\"><code class=\"language-bash\">node scripts/source-bundles/import-evidence-from-supplied-bundles.mjs \\\n  --al-bayan /path/to/al_bayan_cumulative_through_batch10.zip \\\n  --nafais /path/to/phase1_data_through_installment_17.zip\n</code></pre>\n<p>Apply changes to <code class=\"inline_code\">data/book-boundary-evidence.json</code>:</p>\n<pre class=\"code_block\"><code class=\"language-bash\">node scripts/source-bundles/import-evidence-from-supplied-bundles.mjs \\\n  --al-bayan /path/to/al_bayan_cumulative_through_batch10.zip \\\n  --nafais /path/to/phase1_data_through_installment_17.zip \\\n  --apply \\\n  --report /tmp/source-bundle-report.json\n</code></pre>\n<h2 id=\"section-15\">What this importer deliberately does not do</h2>\n<ul class=\"doc_list\">\n<li>it does not rewrite <code class=\"inline_code\">data/book-boundary-primitives.json</code></li>\n<li>it does not silently resolve school-level ambiguities</li>\n<li>it does not replace direct review of the primary witness where the bundles disagree</li>\n<li>it does not become part of <code class=\"inline_code\">npm run generate</code></li>\n</ul>\n<p>The canonical repo must remain reproducible from its checked-in scholarly source layer under <code class=\"inline_code\">data/</code>.\nThe checked-in witness bundles under <code class=\"inline_code\">sources/</code> are curator and cross-reference tools, not replacements for that authored source layer.</p>"
  },
  {
    "slug": "demo-site-plan",
    "title": "Demo site plan",
    "language": "en",
    "direction": "ltr",
    "group": "planning",
    "sourcePath": "demo-site-plan.md",
    "alternateSlug": null,
    "excerpt": "The demo site is a plain Svelte 5 SPA under site/ , built from the uploaded template and cut down to the smallest useful shell.",
    "headers": [
      {
        "id": "section-2",
        "level": 2,
        "title": "Current stack"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "Why the site data contract exists"
      },
      {
        "id": "section-4",
        "level": 2,
        "title": "Current routes"
      },
      {
        "id": "section-5",
        "level": 3,
        "title": "/"
      },
      {
        "id": "section-6",
        "level": 3,
        "title": "/compare"
      },
      {
        "id": "section-7",
        "level": 3,
        "title": "/explorer"
      },
      {
        "id": "section-8",
        "level": 3,
        "title": "/systems/:system"
      },
      {
        "id": "section-9",
        "level": 3,
        "title": "/surahs/:surah"
      },
      {
        "id": "section-10",
        "level": 2,
        "title": "Visual division of labor"
      },
      {
        "id": "section-11",
        "level": 3,
        "title": "Observable Plot"
      },
      {
        "id": "section-12",
        "level": 3,
        "title": "LayerChart"
      },
      {
        "id": "section-13",
        "level": 2,
        "title": "Design direction"
      },
      {
        "id": "section-14",
        "level": 2,
        "title": "Next site phases"
      },
      {
        "id": "section-15",
        "level": 2,
        "title": "GitHub Pages deployment"
      },
      {
        "id": "section-16",
        "level": 2,
        "title": "Further reading"
      }
    ],
    "html": "<h1 id=\"section-1\">Demo site plan</h1>\n<p>The demo site is a <strong>plain Svelte 5 SPA</strong> under <code class=\"inline_code\">site/</code>, built from the uploaded template and cut down to the smallest useful shell.</p>\n<h2 id=\"section-2\">Current stack</h2>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">site/</code> is a Vite + Svelte 5 app</li>\n<li>routing is handled by <strong>Navgo</strong></li>\n<li>reference-style analytical charts use <strong>Observable Plot</strong></li>\n<li>ranked interactive system profiles use <strong>LayerChart</strong></li>\n<li>the app consumes a generated UI contract at <code class=\"inline_code\">site/src/lib/data/generated/site-data.json</code></li>\n</ul>\n<p>No Python backend, API proxy, or server framework is part of the site.</p>\n<h2 id=\"section-3\">Why the site data contract exists</h2>\n<p>The SPA should not have to reconstruct review joins in the browser. Instead, <code class=\"inline_code\">npm run generate</code> builds:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">dist/review/*</code> for scholar packets</li>\n<li><code class=\"inline_code\">site/src/lib/data/generated/site-data.json</code> for the interactive UI</li>\n</ul>\n<p>That generated site payload contains:</p>\n<ul class=\"doc_list\">\n<li>global summary counts</li>\n<li>evidence and attestation summaries</li>\n<li>system registry summaries</li>\n<li>per-surah summaries</li>\n<li>per-system per-surah profiles</li>\n<li>the full disputed-point row set</li>\n<li>slot labels for duplicated disputed points inside one Hafs ayah</li>\n<li>total-count attestation notes</li>\n<li>pairwise system-distance cells</li>\n<li>per-system verification profiles</li>\n<li>review-workload ranking</li>\n<li>per-system per-surah drift curves</li>\n</ul>\n<h2 id=\"section-4\">Current routes</h2>\n<h3 id=\"section-5\"><code class=\"inline_code\">/</code></h3>\n<p>Overview page with:</p>\n<ul class=\"doc_list\">\n<li>hero and framing copy</li>\n<li>summary metric cards</li>\n<li>a short reading primer for <code class=\"inline_code\">end</code>, <code class=\"inline_code\">internal</code>, and <code class=\"inline_code\">+, −, =</code></li>\n<li>total ayah count chart by system</li>\n<li>surah heatmap of disputed-point density</li>\n<li>ranked interactive system fingerprint preview</li>\n<li>quick links into each counting system</li>\n</ul>\n<h3 id=\"section-6\"><code class=\"inline_code\">/compare</code></h3>\n<p>A comparison and review-planning route with:</p>\n<ul class=\"doc_list\">\n<li>pairwise system-distance matrix</li>\n<li>verification coverage bars restricted to counted disputed heads</li>\n<li>review-workload ranking by uncited counted points</li>\n<li>nearest / farthest neighbor table</li>\n</ul>\n<h3 id=\"section-7\"><code class=\"inline_code\">/explorer</code></h3>\n<p>A filterable disputed-point explorer with:</p>\n<ul class=\"doc_list\">\n<li>text search</li>\n<li>system filter</li>\n<li>kind filter</li>\n<li>verification filter</li>\n<li>filtered summary chips</li>\n<li>a simplified table that foregrounds consensus instead of six tiny system badges</li>\n<li>detail panel for the active point</li>\n</ul>\n<h3 id=\"section-8\"><code class=\"inline_code\">/systems/:system</code></h3>\n<p>A system profile page with:</p>\n<ul class=\"doc_list\">\n<li>total ayah count</li>\n<li>delta from Kufi</li>\n<li>counted disputed heads</li>\n<li>cited counted heads</li>\n<li>merge totals</li>\n<li>total-count policy note when present</li>\n<li>nearest / farthest system comparison</li>\n<li>cumulative drift preview inside a chosen surah</li>\n<li>LayerChart-ranked surah fingerprint</li>\n<li>hotspot surahs</li>\n</ul>\n<h3 id=\"section-9\"><code class=\"inline_code\">/surahs/:surah</code></h3>\n<p>A surah drill-down with:</p>\n<ul class=\"doc_list\">\n<li>per-system ayah counts for that surah</li>\n<li>an Observable Plot boundary matrix</li>\n<li>explicit handling for duplicated disputed points within a single Hafs ayah through slot labels like <code class=\"inline_code\">40a</code>, <code class=\"inline_code\">40b</code>, <code class=\"inline_code\">40c</code></li>\n<li>disputed-point table</li>\n<li>point detail panel</li>\n<li>a clean empty state for surahs with no disputed points</li>\n</ul>\n<h2 id=\"section-10\">Visual division of labor</h2>\n<h3 id=\"section-11\">Observable Plot</h3>\n<p>Use it for views that are fundamentally analytical and matrix-like:</p>\n<ul class=\"doc_list\">\n<li>total ayahs by system</li>\n<li>heatmaps</li>\n<li>surah boundary matrices</li>\n<li>verification coverage charts</li>\n<li>system distance matrices</li>\n<li>surah drift timelines</li>\n</ul>\n<h3 id=\"section-12\">LayerChart</h3>\n<p>Use it where the chart itself should feel like the interactive object:</p>\n<ul class=\"doc_list\">\n<li>ranked system fingerprints</li>\n<li>future comparative surah profiles</li>\n<li>future rawi/system consequence explorers</li>\n</ul>\n<h2 id=\"section-13\">Design direction</h2>\n<p>The visual language is intentionally <strong>editorial and manuscript-like</strong>, not “AI dashboard” styled:</p>\n<ul class=\"doc_list\">\n<li>warm paper background</li>\n<li>tinted neutrals instead of grayscale</li>\n<li>serif display typography for framing</li>\n<li>dedicated Arabic typography for scholar-facing labels</li>\n<li>light-first presentation</li>\n<li>restrained accent color for the active scholarly signal</li>\n</ul>\n<h2 id=\"section-14\">Next site phases</h2>\n<ol class=\"doc_list\">\n<li>add shareable URLs for individual disputed points</li>\n<li>add mapping conversion tools based on generated mapping files</li>\n<li>add Arabic label mode and bilingual UI toggles</li>\n<li>add scholar review views keyed to reviewer status and citation coverage</li>\n<li>expand the evidence-backed corpus until comparison charts are no longer dominated by uncited work</li>\n</ol>\n<h2 id=\"section-15\">GitHub Pages deployment</h2>\n<p>The repo now includes a minimal workflow at <code class=\"inline_code\">.github/workflows/deploy-site.yml</code>.</p>\n<p>Deployment rules:</p>\n<ul class=\"doc_list\">\n<li>the workflow regenerates the site data before the frontend build</li>\n<li><code class=\"inline_code\">actions/configure-pages</code> supplies the Pages base path to the Vite build</li>\n<li>the site build writes both <code class=\"inline_code\">404.html</code> and <code class=\"inline_code\">.nojekyll</code> so client-side routes like <code class=\"inline_code\">/surahs/2</code> survive direct loads on GitHub Pages</li>\n</ul>\n<h2 id=\"section-16\">Further reading</h2>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">docs/visual-roadmap.md</code> audits the current visuals and proposes the next useful charts</li>\n<li><code class=\"inline_code\">docs/project-next-steps.md</code> lays out the project-wide priorities after the current structural refactor</li>\n</ul>"
  },
  {
    "slug": "visual-roadmap",
    "title": "Site visual audit and roadmap",
    "language": "en",
    "direction": "ltr",
    "group": "planning",
    "sourcePath": "visual-roadmap.md",
    "alternateSlug": null,
    "excerpt": "This document evaluates the current SPA from the point of view of three jobs:",
    "headers": [
      {
        "id": "section-2",
        "level": 2,
        "title": "What is already working"
      },
      {
        "id": "section-3",
        "level": 3,
        "title": "1. The site has a clear visual grammar"
      },
      {
        "id": "section-4",
        "level": 3,
        "title": "2. The surah matrix is the strongest current chart"
      },
      {
        "id": "section-5",
        "level": 3,
        "title": "3. The explorer/detail pairing works for focused review"
      },
      {
        "id": "section-6",
        "level": 2,
        "title": "Where the current visuals are still weak"
      },
      {
        "id": "section-7",
        "level": 3,
        "title": "1. The homepage is informative but not decision-oriented"
      },
      {
        "id": "section-8",
        "level": 3,
        "title": "2. The heatmap shows density, not importance"
      },
      {
        "id": "section-9",
        "level": 3,
        "title": "3. The system fingerprint is one-dimensional"
      },
      {
        "id": "section-10",
        "level": 3,
        "title": "4. There is no direct system-to-system comparison view"
      },
      {
        "id": "section-11",
        "level": 3,
        "title": "5. Review progress is mostly invisible"
      },
      {
        "id": "section-12",
        "level": 3,
        "title": "6. The site does not yet expose the conversion story"
      },
      {
        "id": "section-13",
        "level": 2,
        "title": "Improvements to the existing visuals"
      },
      {
        "id": "section-14",
        "level": 3,
        "title": "Totals chart"
      },
      {
        "id": "section-15",
        "level": 3,
        "title": "Surah heatmap"
      },
      {
        "id": "section-16",
        "level": 3,
        "title": "System fingerprint"
      },
      {
        "id": "section-17",
        "level": 3,
        "title": "Explorer table"
      },
      {
        "id": "section-18",
        "level": 3,
        "title": "Boundary detail panel"
      },
      {
        "id": "section-19",
        "level": 2,
        "title": "New visuals that would be genuinely useful"
      },
      {
        "id": "section-20",
        "level": 2,
        "title": "Priority A — scholar-review visuals"
      },
      {
        "id": "section-21",
        "level": 3,
        "title": "1. Verification coverage bars"
      },
      {
        "id": "section-22",
        "level": 3,
        "title": "2. Evidence completeness by surah"
      },
      {
        "id": "section-23",
        "level": 3,
        "title": "3. Open-questions board"
      },
      {
        "id": "section-24",
        "level": 2,
        "title": "Priority B — comparison visuals"
      },
      {
        "id": "section-25",
        "level": 3,
        "title": "4. System distance matrix"
      },
      {
        "id": "section-26",
        "level": 3,
        "title": "5. Surah divergence matrix"
      },
      {
        "id": "section-27",
        "level": 3,
        "title": "6. Similarity clusters"
      },
      {
        "id": "section-28",
        "level": 2,
        "title": "Priority C — numbering and mapping visuals"
      },
      {
        "id": "section-29",
        "level": 3,
        "title": "7. Mushaf consequence ribbon"
      },
      {
        "id": "section-30",
        "level": 3,
        "title": "8. Ayah conversion stepper"
      },
      {
        "id": "section-31",
        "level": 3,
        "title": "9. Split/merge consequence timeline"
      },
      {
        "id": "section-32",
        "level": 2,
        "title": "Priority D — editorial/source visuals"
      },
      {
        "id": "section-33",
        "level": 3,
        "title": "10. Source coverage matrix"
      },
      {
        "id": "section-34",
        "level": 3,
        "title": "11. Reviewer agreement chart"
      },
      {
        "id": "section-35",
        "level": 2,
        "title": "Best next visual package"
      },
      {
        "id": "section-36",
        "level": 2,
        "title": "Chart-library guidance"
      }
    ],
    "html": "<h1 id=\"section-1\">Site visual audit and roadmap</h1>\n<p>This document evaluates the current SPA from the point of view of three jobs:</p>\n<ol class=\"doc_list\">\n<li>orientation — help a first-time visitor understand what the corpus is</li>\n<li>comparison — help a reviewer compare counting systems and surahs quickly</li>\n<li>verification — help a scholar inspect one disputed head and judge whether the claim is well sourced</li>\n</ol>\n<h2 id=\"section-2\">What is already working</h2>\n<h3 id=\"section-3\">1. The site has a clear visual grammar</h3>\n<p>The current split is sound:</p>\n<ul class=\"doc_list\">\n<li><strong>Observable Plot</strong> handles reference-like views well</li>\n<li><strong>LayerChart</strong> handles ranked profile browsing well</li>\n<li>the warm editorial styling fits the subject matter better than a generic dashboard aesthetic</li>\n</ul>\n<p>That is the right foundation and should stay.</p>\n<h3 id=\"section-4\">2. The surah matrix is the strongest current chart</h3>\n<p>The surah page is the most useful analytical view in the app because it answers a real review question:</p>\n<ul class=\"doc_list\">\n<li>where is the disputed point?</li>\n<li>which systems count it?</li>\n<li>does that produce a split, merge, or no numbering change against Kufi?</li>\n</ul>\n<p>The slot-label fix (<code class=\"inline_code\">40a</code>, <code class=\"inline_code\">40b</code>, <code class=\"inline_code\">40c</code>) was necessary and correct.</p>\n<h3 id=\"section-5\">3. The explorer/detail pairing works for focused review</h3>\n<p>The table plus right-hand detail panel is the right interaction model for a scholar-review workflow:</p>\n<ul class=\"doc_list\">\n<li>skim rows on the left</li>\n<li>read a fully grounded point on the right</li>\n<li>keep system consequences and evidence state together</li>\n</ul>\n<h2 id=\"section-6\">Where the current visuals are still weak</h2>\n<h3 id=\"section-7\">1. The homepage is informative but not decision-oriented</h3>\n<p>The current overview answers “what exists?” better than “what matters most?”</p>\n<p>The totals chart is clean, but those six totals are not the most interesting question once the user knows the systems exist. The more important overview questions are:</p>\n<ul class=\"doc_list\">\n<li>which systems are most similar?</li>\n<li>which surahs drive the differences?</li>\n<li>where is the evidence still missing?</li>\n<li>which unresolved issues block scholarly sign-off?</li>\n</ul>\n<h3 id=\"section-8\">2. The heatmap shows density, not importance</h3>\n<p>The current heatmap counts disputed points by surah and kind. That is useful, but it can be misread.</p>\n<p>A surah with many disputed points is not automatically a surah with the largest numbering consequence or the most urgent review need. Right now the chart cannot distinguish between:</p>\n<ul class=\"doc_list\">\n<li>many low-consequence points</li>\n<li>a smaller number of high-divergence points</li>\n<li>well-cited vs uncited points</li>\n</ul>\n<h3 id=\"section-9\">3. The system fingerprint is one-dimensional</h3>\n<p>The current LayerChart fingerprint ranks surahs by <strong>counted disputed heads</strong>. That is readable, but it only shows one axis.</p>\n<p>For serious comparison, reviewers also need to see:</p>\n<ul class=\"doc_list\">\n<li>net delta from Kufi in that surah</li>\n<li>split count vs merge count</li>\n<li>whether the surah is evidence-complete or evidence-empty</li>\n</ul>\n<h3 id=\"section-10\">4. There is no direct system-to-system comparison view</h3>\n<p>At the moment the site compares each system against Kufi point-by-point, which is necessary, but not sufficient.</p>\n<p>A reviewer also needs to answer:</p>\n<ul class=\"doc_list\">\n<li>how close are Makki and Madani Last overall?</li>\n<li>which surahs separate Basri from Dimashqi the most?</li>\n<li>where do two systems differ even when both depart from Kufi?</li>\n</ul>\n<p>That view does not exist yet.</p>\n<h3 id=\"section-11\">5. Review progress is mostly invisible</h3>\n<p>The current UI does show evidence counts in the detail panel, but there is no strong visual layer for project status.</p>\n<p>The project now needs charts that make these states impossible to miss:</p>\n<ul class=\"doc_list\">\n<li>uncited</li>\n<li>cited from primary source</li>\n<li>reviewed</li>\n<li>disputed</li>\n<li>unresolved</li>\n</ul>\n<h3 id=\"section-12\">6. The site does not yet expose the conversion story</h3>\n<p>The core promise of the dataset is not just “these heads are disputed.” It is also:</p>\n<ul class=\"doc_list\">\n<li>how numbering changes downstream</li>\n<li>how one system maps to another</li>\n<li>where a split or merge begins and ends</li>\n</ul>\n<p>That narrative is still mostly hidden inside the generated mappings.</p>\n<h2 id=\"section-13\">Improvements to the existing visuals</h2>\n<h3 id=\"section-14\">Totals chart</h3>\n<p>Keep it, but demote it. It works as a compact orientation graphic, not as the lead analytical chart.</p>\n<p>Better follow-up:</p>\n<ul class=\"doc_list\">\n<li>add a small note that total ayah count alone is only the final aggregate of many local boundary decisions</li>\n<li>place it below a more consequential comparison chart</li>\n</ul>\n<h3 id=\"section-15\">Surah heatmap</h3>\n<p>Keep it, but rename it more precisely and add adjacent alternatives.</p>\n<p>Recommended additions:</p>\n<ul class=\"doc_list\">\n<li>toggle between <code class=\"inline_code\">point count</code>, <code class=\"inline_code\">net delta range</code>, and <code class=\"inline_code\">citation completeness</code></li>\n<li>keep the current chart as the <code class=\"inline_code\">source density</code> mode</li>\n</ul>\n<h3 id=\"section-16\">System fingerprint</h3>\n<p>Keep the ranked list, but allow the metric to switch.</p>\n<p>Useful ranking modes:</p>\n<ul class=\"doc_list\">\n<li>counted disputed heads</li>\n<li>net delta from Kufi</li>\n<li>split effects</li>\n<li>merge effects</li>\n<li>uncited points remaining</li>\n</ul>\n<p>This is a good place for <strong>LayerChart</strong> because the chart is exploratory and the ranking switch changes the feel of the whole object.</p>\n<h3 id=\"section-17\">Explorer table</h3>\n<p>The current simplification was correct. The next upgrade should not add more badges back.</p>\n<p>Instead add:</p>\n<ul class=\"doc_list\">\n<li>sort by <code class=\"inline_code\">counted_by_count</code></li>\n<li>sort by <code class=\"inline_code\">verification_status</code></li>\n<li>sort by <code class=\"inline_code\">surah</code></li>\n<li>optional “show only unresolved / uncited / high-disagreement points” presets</li>\n</ul>\n<h3 id=\"section-18\">Boundary detail panel</h3>\n<p>This is already directionally right. The next gains are about evidence quality.</p>\n<p>Add room for:</p>\n<ul class=\"doc_list\">\n<li>exact source locator prominence</li>\n<li>source tier grouping</li>\n<li>“direct wording vs inferred support” distinction</li>\n<li>reviewer verdict summary</li>\n</ul>\n<h2 id=\"section-19\">New visuals that would be genuinely useful</h2>\n<p>These are ordered by value, not novelty.</p>\n<h2 id=\"section-20\">Priority A — scholar-review visuals</h2>\n<h3 id=\"section-21\">1. Verification coverage bars</h3>\n<p><strong>Question answered:</strong> how close is each system to being review-ready?</p>\n<p>Chart:</p>\n<ul class=\"doc_list\">\n<li>stacked horizontal bars by system</li>\n<li>segments: uncited, secondary-only, primary-cited, reviewed, disputed, unresolved</li>\n</ul>\n<p>Library:</p>\n<ul class=\"doc_list\">\n<li><strong>Observable Plot</strong></li>\n</ul>\n<p>Why it matters:</p>\n<ul class=\"doc_list\">\n<li>this becomes the project health graphic</li>\n<li>it immediately tells scholars where help is needed</li>\n</ul>\n<h3 id=\"section-22\">2. Evidence completeness by surah</h3>\n<p><strong>Question answered:</strong> which surahs are ready for review and which are still evidence-empty?</p>\n<p>Chart:</p>\n<ul class=\"doc_list\">\n<li>surah heatmap or matrix</li>\n<li>color by percent of points in that surah that have primary evidence</li>\n</ul>\n<p>Library:</p>\n<ul class=\"doc_list\">\n<li><strong>Observable Plot</strong></li>\n</ul>\n<h3 id=\"section-23\">3. Open-questions board</h3>\n<p><strong>Question answered:</strong> what exactly still blocks sign-off?</p>\n<p>View:</p>\n<ul class=\"doc_list\">\n<li>grouped cards or compact table</li>\n<li>group by system, then surah</li>\n<li>show only <code class=\"inline_code\">disputed</code> and <code class=\"inline_code\">unresolved</code></li>\n</ul>\n<p>This is more useful than a generic dashboard chart because it is directly actionable.</p>\n<h2 id=\"section-24\">Priority B — comparison visuals</h2>\n<h3 id=\"section-25\">4. System distance matrix</h3>\n<p><strong>Question answered:</strong> which counting systems are closest to each other?</p>\n<p>Chart:</p>\n<ul class=\"doc_list\">\n<li>6×6 symmetric heatmap</li>\n<li>color encodes number of disputed points where two systems differ</li>\n<li>tooltip shows same-count / different-count totals</li>\n</ul>\n<p>Library:</p>\n<ul class=\"doc_list\">\n<li><strong>Observable Plot</strong></li>\n</ul>\n<p>This should probably become the lead overview chart on the homepage.</p>\n<h3 id=\"section-26\">5. Surah divergence matrix</h3>\n<p><strong>Question answered:</strong> in which surahs do two systems separate most strongly?</p>\n<p>Chart:</p>\n<ul class=\"doc_list\">\n<li>system pair selector</li>\n<li>ranked bar chart of surahs by pairwise disagreement count</li>\n</ul>\n<p>Library:</p>\n<ul class=\"doc_list\">\n<li><strong>LayerChart</strong> for the ranked interactive view</li>\n</ul>\n<h3 id=\"section-27\">6. Similarity clusters</h3>\n<p><strong>Question answered:</strong> what families of behavior appear in the counting systems?</p>\n<p>Chart:</p>\n<ul class=\"doc_list\">\n<li>dendrogram or clustered matrix derived from pairwise disagreement counts</li>\n</ul>\n<p>Library:</p>\n<ul class=\"doc_list\">\n<li><strong>Observable Plot</strong> or a custom SVG/D3 view if needed</li>\n</ul>\n<p>This is secondary to the pairwise matrix, but it is a strong explanatory graphic once the basics are in place.</p>\n<h2 id=\"section-28\">Priority C — numbering and mapping visuals</h2>\n<h3 id=\"section-29\">7. Mushaf consequence ribbon</h3>\n<p><strong>Question answered:</strong> where across the whole mushaf does one selected system diverge from Kufi?</p>\n<p>Chart:</p>\n<ul class=\"doc_list\">\n<li>a long ribbon of disputed points in reading order</li>\n<li>color: split / merge / no-effect</li>\n<li>optional brush into a surah or range</li>\n</ul>\n<p>Library:</p>\n<ul class=\"doc_list\">\n<li><strong>Observable Plot</strong> for the static version</li>\n<li><strong>LayerChart</strong> only if you add brushing/panning and richer interaction</li>\n</ul>\n<h3 id=\"section-30\">8. Ayah conversion stepper</h3>\n<p><strong>Question answered:</strong> how does a specific Hafs ayah map into another system?</p>\n<p>View:</p>\n<ul class=\"doc_list\">\n<li>input: <code class=\"inline_code\">surah</code>, <code class=\"inline_code\">ayah</code>, <code class=\"inline_code\">from</code>, <code class=\"inline_code\">to</code></li>\n<li>output: target ayah/ayahs and the local reason why</li>\n<li>show the nearest disputed heads before and after</li>\n</ul>\n<p>This is one of the most important missing product features.</p>\n<h3 id=\"section-31\">9. Split/merge consequence timeline</h3>\n<p><strong>Question answered:</strong> what does a local boundary decision do downstream inside the surah?</p>\n<p>Chart:</p>\n<ul class=\"doc_list\">\n<li>for one surah and one system, show cumulative delta against Kufi across the surah</li>\n</ul>\n<p>Library:</p>\n<ul class=\"doc_list\">\n<li><strong>Observable Plot</strong></li>\n</ul>\n<p>This is a high-value explanatory chart because it turns abstract splits and merges into visible numbering drift.</p>\n<h2 id=\"section-32\">Priority D — editorial/source visuals</h2>\n<h3 id=\"section-33\">10. Source coverage matrix</h3>\n<p><strong>Question answered:</strong> which classical works support which points?</p>\n<p>Chart:</p>\n<ul class=\"doc_list\">\n<li>points on one axis, source works on the other</li>\n<li>marks for direct / indirect / absent support</li>\n</ul>\n<p>This becomes powerful once the evidence sidecar is populated.</p>\n<h3 id=\"section-34\">11. Reviewer agreement chart</h3>\n<p><strong>Question answered:</strong> where do reviewers agree, disagree, or leave comments?</p>\n<p>Chart:</p>\n<ul class=\"doc_list\">\n<li>by system or surah</li>\n<li>counts of accepted, contested, unresolved points</li>\n</ul>\n<p>This should only appear after reviewer data becomes real.</p>\n<h2 id=\"section-35\">Best next visual package</h2>\n<p>If the goal is to make the site much more useful with one coherent pass, build these four next:</p>\n<ol class=\"doc_list\">\n<li><strong>system distance matrix</strong></li>\n<li><strong>verification coverage bars</strong></li>\n<li><strong>ayah conversion stepper</strong></li>\n<li><strong>cumulative surah delta timeline</strong></li>\n</ol>\n<p>That combination would make the site better at:</p>\n<ul class=\"doc_list\">\n<li>overview</li>\n<li>comparison</li>\n<li>verification</li>\n<li>practical use</li>\n</ul>\n<p>all at once.</p>\n<h2 id=\"section-36\">Chart-library guidance</h2>\n<p>Use <strong>Observable Plot</strong> when the visual is:</p>\n<ul class=\"doc_list\">\n<li>matrix-like</li>\n<li>aggregate</li>\n<li>reference-oriented</li>\n<li>small-multiple friendly</li>\n<li>better read than manipulated</li>\n</ul>\n<p>Use <strong>LayerChart</strong> when the visual is:</p>\n<ul class=\"doc_list\">\n<li>rank-based</li>\n<li>highly interactive</li>\n<li>filter-driven</li>\n<li>brushable or comparative in a way that benefits from a more app-like feel</li>\n</ul>\n<p>Do not add D3 just because a chart sounds sophisticated. The current stack is already enough for most of the roadmap.</p>"
  },
  {
    "slug": "project-next-steps",
    "title": "What is next for the project",
    "language": "en",
    "direction": "ltr",
    "group": "planning",
    "sourcePath": "project-next-steps.md",
    "alternateSlug": null,
    "excerpt": "The project now has a strong canonical source layer, deterministic generators, review packets, and a public-facing SPA. The next phase is not more structural refactoring. The next phase is scholarly completion .",
    "headers": [
      {
        "id": "section-2",
        "level": 2,
        "title": "Immediate priority order"
      },
      {
        "id": "section-3",
        "level": 3,
        "title": "1. Finish the first real evidence pass"
      },
      {
        "id": "section-4",
        "level": 3,
        "title": "2. Run scholar packets system by system"
      },
      {
        "id": "section-5",
        "level": 3,
        "title": "3. Add release gates tied to evidence quality"
      },
      {
        "id": "section-6",
        "level": 3,
        "title": "4. Keep pushing the site from atlas to working tool"
      },
      {
        "id": "section-7",
        "level": 3,
        "title": "5. Publish a reviewer workflow"
      },
      {
        "id": "section-8",
        "level": 3,
        "title": "6. Prepare a first scholarly outreach release"
      },
      {
        "id": "section-9",
        "level": 2,
        "title": "What should not be next"
      },
      {
        "id": "section-10",
        "level": 3,
        "title": "Do not spend the next phase on more compression work"
      },
      {
        "id": "section-11",
        "level": 3,
        "title": "Do not spend the next phase on adding many more charts before evidence exists"
      },
      {
        "id": "section-12",
        "level": 3,
        "title": "Do not treat public APIs as primary proof"
      },
      {
        "id": "section-13",
        "level": 2,
        "title": "Best next execution sequence"
      },
      {
        "id": "section-14",
        "level": 3,
        "title": "Phase 12"
      },
      {
        "id": "section-15",
        "level": 3,
        "title": "Phase 13"
      },
      {
        "id": "section-16",
        "level": 3,
        "title": "Phase 14"
      }
    ],
    "html": "<h1 id=\"section-1\">What is next for the project</h1>\n<p>The project now has a strong canonical source layer, deterministic generators, review packets, and a public-facing SPA. The next phase is not more structural refactoring. The next phase is <strong>scholarly completion</strong>.</p>\n<h2 id=\"section-2\">Immediate priority order</h2>\n<h3 id=\"section-3\">1. Finish the first real evidence pass</h3>\n<p>This is the main blocker. The first primary citations have now landed for a small Madani-first slice, but the project still needs one complete system-level evidence pass.</p>\n<p>The source layer now makes explicit claims in <code class=\"inline_code\">data/book-boundary-primitives.json</code>, and the evidence sidecar exists in <code class=\"inline_code\">data/book-boundary-evidence.json</code>. The next real work is to populate evidence records point by point.</p>\n<p>Success condition:</p>\n<ul class=\"doc_list\">\n<li>every disputed point has at least one evidence record</li>\n<li>source tier is explicit</li>\n<li>direct vs derived support is explicit</li>\n<li>locators are precise enough for another reviewer to re-open the source quickly</li>\n</ul>\n<h3 id=\"section-4\">2. Run scholar packets system by system</h3>\n<p>Do not ask for global approval of the whole project first.</p>\n<p>Instead, review in packets:</p>\n<ol class=\"doc_list\">\n<li>Madani First</li>\n<li>Madani Last</li>\n<li>Makki</li>\n<li>Basri</li>\n<li>Dimashqi</li>\n<li>Kufi reference handling</li>\n</ol>\n<p>Success condition:</p>\n<ul class=\"doc_list\">\n<li>each system has a bounded review packet</li>\n<li>comments and corrections flow back into the evidence sidecar and primitives</li>\n<li>unresolved items are kept explicit</li>\n</ul>\n<h3 id=\"section-5\">3. Add release gates tied to evidence quality</h3>\n<p>Technical validation is already strong. The next gate should be editorial.</p>\n<p>Recommended release rule:</p>\n<ul class=\"doc_list\">\n<li>no release marked “scholarly reviewed” unless every point is either cited, reviewed, disputed, or unresolved by explicit status</li>\n</ul>\n<h3 id=\"section-6\">4. Keep pushing the site from atlas to working tool</h3>\n<p>The most useful comparison and review-planning views are now in place:</p>\n<ul class=\"doc_list\">\n<li>system distance matrix</li>\n<li>verification coverage bars</li>\n<li>review-workload ranking</li>\n<li>cumulative surah delta timeline</li>\n</ul>\n<p>The next tool to add is the ayah conversion stepper.</p>\n<h3 id=\"section-7\">5. Publish a reviewer workflow</h3>\n<p>Make the contribution path obvious for scholars and research assistants.</p>\n<p>Needed pieces:</p>\n<ul class=\"doc_list\">\n<li>reviewer instructions in Arabic and English</li>\n<li>one example of a fully reviewed point</li>\n<li>one example of a disputed point</li>\n<li>exact rules for how to record direct vs derived support</li>\n</ul>\n<h3 id=\"section-8\">6. Prepare a first scholarly outreach release</h3>\n<p>Once one system is well cited, cut a review release instead of waiting for the entire corpus to be perfect.</p>\n<p>That release should include:</p>\n<ul class=\"doc_list\">\n<li>the source files</li>\n<li>the generated review packets</li>\n<li>the site</li>\n<li>a short statement of what has and has not yet been verified</li>\n</ul>\n<h2 id=\"section-9\">What should not be next</h2>\n<h3 id=\"section-10\">Do not spend the next phase on more compression work</h3>\n<p>The source layer is already concise and book-aligned enough.</p>\n<h3 id=\"section-11\">Do not spend the next phase on adding many more charts before evidence exists</h3>\n<p>Visual polish helps, but the hardest truth of the project still lives in the source citations.</p>\n<h3 id=\"section-12\">Do not treat public APIs as primary proof</h3>\n<p>They remain useful consistency checks, not the authority layer.</p>\n<h2 id=\"section-13\">Best next execution sequence</h2>\n<h3 id=\"section-14\">Phase 12</h3>\n<ul class=\"doc_list\">\n<li>finish one system-level evidence pass end to end</li>\n<li>upgrade release gates around evidence completeness</li>\n<li>use the new comparison and workload views to choose outreach order</li>\n</ul>\n<h3 id=\"section-15\">Phase 13</h3>\n<ul class=\"doc_list\">\n<li>run scholar review for that system</li>\n<li>record reviewer outcomes in the evidence layer</li>\n<li>publish a review release and public demo</li>\n</ul>\n<h3 id=\"section-16\">Phase 14</h3>\n<ul class=\"doc_list\">\n<li>repeat system by system until the corpus is fully reviewed</li>\n</ul>\n<p>That is the path from “well-structured dataset” to “scholarly trusted reference.”</p>"
  },
  {
    "slug": "phases-summary",
    "title": "Qiraat Ayah Map — Summary of Phases 1–17",
    "language": "en",
    "direction": "ltr",
    "group": "planning",
    "sourcePath": "phases-summary.md",
    "alternateSlug": null,
    "excerpt": "This document summarizes the work completed across the first 17 phases of the project. It focuses on the concrete technical, data, scholarly, and product changes that were made.",
    "headers": [
      {
        "id": "section-2",
        "level": 2,
        "title": "What changed overall"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "Phase-by-phase summary"
      },
      {
        "id": "section-4",
        "level": 3,
        "title": "Phase 1 — Core mapping repair"
      },
      {
        "id": "section-5",
        "level": 3,
        "title": "Phase 2 — Boundary semantics and reconciliation"
      },
      {
        "id": "section-6",
        "level": 3,
        "title": "Phase 3 — Basri correction"
      },
      {
        "id": "section-7",
        "level": 3,
        "title": "Phase 4 — Madani-last repair and API harness fix"
      },
      {
        "id": "section-8",
        "level": 3,
        "title": "Phase 5 — Classical attestation layer"
      },
      {
        "id": "section-9",
        "level": 3,
        "title": "Phase 6 — Makki total resolved to the primary Dānī riwāya"
      },
      {
        "id": "section-10",
        "level": 3,
        "title": "Phase 7A — Scholar-facing primitive model introduced"
      },
      {
        "id": "section-11",
        "level": 3,
        "title": "Phase 7B — Primitive layer became canonical"
      },
      {
        "id": "section-12",
        "level": 3,
        "title": "Phase 7C — Hard cutover to source vs generated split"
      },
      {
        "id": "section-13",
        "level": 3,
        "title": "Phase 8 — Evidence sidecar and scholar review artifacts"
      },
      {
        "id": "section-14",
        "level": 3,
        "title": "Phase 9 — Initial Svelte SPA"
      },
      {
        "id": "section-15",
        "level": 3,
        "title": "Phase 10 — Site polish and data-contract cleanup"
      },
      {
        "id": "section-16",
        "level": 3,
        "title": "Phase 11 — GitHub Pages deploy and visual roadmap"
      },
      {
        "id": "section-17",
        "level": 3,
        "title": "Phase 12 — First real primary evidence + comparison views"
      },
      {
        "id": "section-18",
        "level": 3,
        "title": "Phase 13 — Structured source-bundle importer"
      },
      {
        "id": "section-19",
        "level": 3,
        "title": "Phase 14 — Dual use of al-Qāḍī material"
      },
      {
        "id": "section-20",
        "level": 3,
        "title": "Phase 15 — Integration of a more canonical al-Bayān source"
      },
      {
        "id": "section-21",
        "level": 3,
        "title": "Phase 16 — Developer guide and plain-language project explanation"
      },
      {
        "id": "section-22",
        "level": 3,
        "title": "Phase 17 — Arabic scholar-facing introduction"
      },
      {
        "id": "section-23",
        "level": 3,
        "title": "Phase 18 — Wuchale cutover"
      },
      {
        "id": "section-24",
        "level": 2,
        "title": "Current state after Phase 18"
      },
      {
        "id": "section-25",
        "level": 3,
        "title": "Canonical source layer"
      },
      {
        "id": "section-26",
        "level": 3,
        "title": "Generated outputs"
      },
      {
        "id": "section-27",
        "level": 3,
        "title": "Evidence state"
      },
      {
        "id": "section-28",
        "level": 3,
        "title": "Public site"
      },
      {
        "id": "section-29",
        "level": 3,
        "title": "What the project can now do"
      },
      {
        "id": "section-30",
        "level": 3,
        "title": "What still remains"
      }
    ],
    "html": "<h1 id=\"section-1\">Qiraat Ayah Map — Summary of Phases 1–17</h1>\n<p>This document summarizes the work completed across the first 17 phases of the project. It focuses on the concrete technical, data, scholarly, and product changes that were made.</p>\n<h2 id=\"section-2\">What changed overall</h2>\n<p>Across these 17 phases, the project moved through four major stages:</p>\n<ol class=\"doc_list\">\n<li><strong>Repairing the original dataset</strong>: fixing broken mappings, rawi coverage, reverse mappings, and count-system inconsistencies.</li>\n<li><strong>Rebuilding the repo around canonical source data</strong>: replacing large checked-in mapping files with a small scholar-facing primitive layer plus generated outputs.</li>\n<li><strong>Adding evidence and review infrastructure</strong>: introducing a point-by-point evidence sidecar, review artifacts, source importers, and cross-references to classical works.</li>\n<li><strong>Building a public-facing site and documentation</strong>: creating a Svelte SPA, scholar-facing introductions, developer usage docs, review visuals, and deployment automation.</li>\n</ol>\n<hr/>\n<h2 id=\"section-3\">Phase-by-phase summary</h2>\n<h3 id=\"section-4\">Phase 1 — Core mapping repair</h3>\n<ul class=\"doc_list\">\n<li>Fixed the forward-mapping generator so it could handle <strong>multi-split ayahs</strong>, not just a single extra split.</li>\n<li>Added a normalization pass to materialize full <code class=\"inline_code\">splits_into</code> ranges from shipped target numbering.</li>\n<li>Regenerated reverse mappings so target ayahs no longer had <code class=\"inline_code\">hafs_ayah: null</code> holes.</li>\n<li>Synced rawi metadata to full coverage:<ul class=\"doc_list\">\n<li><strong>20 rawi files</strong> present</li>\n<li>known <code class=\"inline_code\">_mushaf_id</code> values populated where available</li>\n<li>non-Kufi by-rawi aliases expanded to <strong>24 files</strong></li>\n</ul>\n</li>\n<li>Strengthened validation to check full target coverage, reverse coverage, and rawi alias integrity.</li>\n</ul>\n<h3 id=\"section-5\">Phase 2 — Boundary semantics and reconciliation</h3>\n<ul class=\"doc_list\">\n<li>Added <code class=\"inline_code\">data/boundary-events.json</code> as a mapping-derived boundary layer.</li>\n<li>Added <code class=\"inline_code\">data/differences-reconciliation.json</code> to show where <code class=\"inline_code\">data/differences.json</code> agrees or disagrees with the generated mappings.</li>\n<li>Made merge overlap explicit with <code class=\"inline_code\">merges_with_next: true</code>, including split+merge cases.</li>\n<li>Updated docs and tests so the documented schema matched the actual generated data.</li>\n</ul>\n<h3 id=\"section-6\">Phase 3 — Basri correction</h3>\n<ul class=\"doc_list\">\n<li>Moved <strong>Basri</strong> from the legacy shipped mapping path to the generated-from-source path.</li>\n<li>Updated <code class=\"inline_code\">data/counting-systems.json</code> and regenerated Basri mappings, reverse mappings, aliases, surah counts, and reconciliation files.</li>\n<li>Result:<ul class=\"doc_list\">\n<li><strong>Basri total = 6204</strong></li>\n<li><strong>Basri surah 2 = 287</strong></li>\n<li><code class=\"inline_code\">differences-reconciliation.json</code> showed <code class=\"inline_code\">basri.is_exact_match = true</code></li>\n</ul>\n</li>\n</ul>\n<h3 id=\"section-7\">Phase 4 — Madani-last repair and API harness fix</h3>\n<ul class=\"doc_list\">\n<li>Added the missing <strong>madani-last</strong> split at <strong>67:9</strong> (<code class=\"inline_code\">نذير</code>).</li>\n<li>Switched all non-Kufan systems to generate from <code class=\"inline_code\">data/differences.json</code>.</li>\n<li>Result:<ul class=\"doc_list\">\n<li><strong>madani-last total = 6214</strong></li>\n<li>all five non-Kufan systems reconciled exactly against the source layer</li>\n</ul>\n</li>\n<li>Fixed <code class=\"inline_code\">tests/validate-against-api.mjs</code> to treat Quranpedia’s <code class=\"inline_code\">number_in_hafs</code> as an <strong>array</strong>, not a scalar.</li>\n<li>Makki was also moved through the generated path, producing the then-current generated values:<ul class=\"doc_list\">\n<li>surah 72 = 28</li>\n<li>surah 91 = 16</li>\n</ul>\n</li>\n</ul>\n<h3 id=\"section-8\">Phase 5 — Classical attestation layer</h3>\n<ul class=\"doc_list\">\n<li>Added <code class=\"inline_code\">data/classical-count-attestations.json</code> and a generator for it.</li>\n<li>This recorded the difference between:<ul class=\"doc_list\">\n<li>mapping-derived totals</li>\n<li>classical attested totals</li>\n</ul>\n</li>\n<li>It made the remaining Makki tension explicit instead of hiding it:<ul class=\"doc_list\">\n<li>generated Makki total = <strong>6221</strong></li>\n<li>primary classical total = <strong>6219</strong></li>\n<li>delta = <strong>2</strong></li>\n</ul>\n</li>\n</ul>\n<h3 id=\"section-9\">Phase 6 — Makki total resolved to the primary Dānī riwāya</h3>\n<ul class=\"doc_list\">\n<li>Removed two Makki split events from <code class=\"inline_code\">data/differences.json</code>:<ul class=\"doc_list\">\n<li><code class=\"inline_code\">78:40</code> (<code class=\"inline_code\">قريبا</code>)</li>\n<li><code class=\"inline_code\">91:14</code> (<code class=\"inline_code\">فعقروها</code>)</li>\n</ul>\n</li>\n<li>Updated <code class=\"inline_code\">data/counting-systems.json</code> and regenerated Makki outputs.</li>\n<li>Result:<ul class=\"doc_list\">\n<li><strong>Makki total = 6219</strong></li>\n<li><strong>Makki surah 78 = 40</strong></li>\n<li><strong>Makki surah 91 = 15</strong></li>\n</ul>\n</li>\n<li>The attestation layer kept the disputed points explicit instead of silently forgetting them.</li>\n</ul>\n<h3 id=\"section-10\">Phase 7A — Scholar-facing primitive model introduced</h3>\n<ul class=\"doc_list\">\n<li>Added <code class=\"inline_code\">data/book-boundary-primitives.json</code>.</li>\n<li>Added a schema and tooling for a book-aligned model based on:<ul class=\"doc_list\">\n<li><code class=\"inline_code\">end</code></li>\n<li><code class=\"inline_code\">internal</code></li>\n<li><code class=\"inline_code\">counted_by</code></li>\n</ul>\n</li>\n<li>This was designed to match how classical <code class=\"inline_code\">ʿadad al-āy</code> books describe disputed heads.</li>\n<li>The new primitive layer round-tripped exactly back into <code class=\"inline_code\">differences.json</code>.</li>\n</ul>\n<h3 id=\"section-11\">Phase 7B — Primitive layer became canonical</h3>\n<ul class=\"doc_list\">\n<li>Made <code class=\"inline_code\">book-boundary-primitives.json</code> the <strong>canonical edited source</strong>.</li>\n<li>Changed <code class=\"inline_code\">differences.json</code> into a <strong>generated compatibility view</strong>.</li>\n<li>Changed forward mappings to derive from the primitives, not from <code class=\"inline_code\">differences.json</code>.</li>\n<li>Added normalization for the scholar-facing primitive document.</li>\n<li>Updated docs so contributors would edit the book-aligned source first.</li>\n</ul>\n<h3 id=\"section-12\">Phase 7C — Hard cutover to source vs generated split</h3>\n<ul class=\"doc_list\">\n<li>Reduced <code class=\"inline_code\">data/</code> to concise authored source only.</li>\n<li>Moved verbose derived outputs into <code class=\"inline_code\">dist/</code>.</li>\n<li>Added cleanup and path utilities for the new repo layout.</li>\n<li>Result:<ul class=\"doc_list\">\n<li><code class=\"inline_code\">data/</code> went from <strong>67 files / ~18 MB</strong> to <strong>3 files / ~57 KB</strong> at that stage</li>\n<li>generated mappings, rawis, surah counts, and reconciliation files moved under <code class=\"inline_code\">dist/</code></li>\n</ul>\n</li>\n</ul>\n<h3 id=\"section-13\">Phase 8 — Evidence sidecar and scholar review artifacts</h3>\n<ul class=\"doc_list\">\n<li>Added <code class=\"inline_code\">data/book-boundary-evidence.json</code> as the evidence sidecar to the primitive claims layer.</li>\n<li>Added evidence normalization and review-artifact generation.</li>\n<li>Generated <code class=\"inline_code\">dist/review/</code> outputs including:<ul class=\"doc_list\">\n<li><code class=\"inline_code\">review-data.json</code></li>\n<li><code class=\"inline_code\">master-matrix.csv</code></li>\n<li><code class=\"inline_code\">totals.md</code></li>\n<li><code class=\"inline_code\">open-questions.md</code></li>\n<li><code class=\"inline_code\">systems/*.md</code></li>\n</ul>\n</li>\n<li>Added major documentation:<ul class=\"doc_list\">\n<li>editorial policy</li>\n<li>methodology</li>\n<li>source catalog</li>\n<li>Arabic reviewer guide</li>\n</ul>\n</li>\n<li>The review layer initially exposed the full review problem honestly:<ul class=\"doc_list\">\n<li><strong>246 disputed boundary points</strong> total</li>\n<li><strong>134 end</strong> points</li>\n<li><strong>112 internal</strong> points</li>\n<li>all <strong>246 initially uncited</strong></li>\n</ul>\n</li>\n</ul>\n<h3 id=\"section-14\">Phase 9 — Initial Svelte SPA</h3>\n<ul class=\"doc_list\">\n<li>Added a new <code class=\"inline_code\">site/</code> app based on the provided Svelte template, simplified into a KISS SPA.</li>\n<li>Removed backend/server baggage from the template.</li>\n<li>Added <code class=\"inline_code\">scripts/generate-site-data.mjs</code> so site data is generated from the repo source layer.</li>\n<li>Initial routes:<ul class=\"doc_list\">\n<li><code class=\"inline_code\">/</code></li>\n<li><code class=\"inline_code\">/explorer</code></li>\n<li><code class=\"inline_code\">/systems/:system</code></li>\n<li><code class=\"inline_code\">/surahs/:surah</code></li>\n</ul>\n</li>\n<li>Initial charting choices:<ul class=\"doc_list\">\n<li><strong>Observable Plot</strong> for overview and matrix-style views</li>\n<li><strong>LayerChart</strong> for interactive system profile views</li>\n</ul>\n</li>\n</ul>\n<h3 id=\"section-15\">Phase 10 — Site polish and data-contract cleanup</h3>\n<ul class=\"doc_list\">\n<li>Fixed a key visual correctness issue: multiple disputed points inside one Hafs ayah no longer overlapped invisibly.</li>\n<li>Added stable slot labels like <code class=\"inline_code\">40a</code>, <code class=\"inline_code\">40b</code>, <code class=\"inline_code\">40c</code> for same-ayah internal points.</li>\n<li>Simplified the explorer table and moved detailed per-system interpretation into the side panel.</li>\n<li>Improved the detail panel with:<ul class=\"doc_list\">\n<li>counted-by / omitted-by grouping</li>\n<li>numbering-effect language</li>\n<li>evidence and reviewer display</li>\n</ul>\n</li>\n<li>Tightened the site data contract with fields such as:<ul class=\"doc_list\">\n<li><code class=\"inline_code\">location_label</code></li>\n<li><code class=\"inline_code\">counted_by_count</code></li>\n<li><code class=\"inline_code\">omitted_by_count</code></li>\n<li><code class=\"inline_code\">surah_row_index</code></li>\n<li><code class=\"inline_code\">ayah_slot_index</code></li>\n<li><code class=\"inline_code\">ayah_slot_count</code></li>\n<li><code class=\"inline_code\">ayah_slot_label</code></li>\n</ul>\n</li>\n</ul>\n<h3 id=\"section-16\">Phase 11 — GitHub Pages deploy and visual roadmap</h3>\n<ul class=\"doc_list\">\n<li>Added a simplified GitHub Pages workflow for the SPA.</li>\n<li>Added base-path handling for Vite and Navgo so the app can work under a repo subpath.</li>\n<li>Added <code class=\"inline_code\">404.html</code>/<code class=\"inline_code\">.nojekyll</code> support for static hosting.</li>\n<li>Added planning docs for:<ul class=\"doc_list\">\n<li>visual roadmap</li>\n<li>project next steps</li>\n</ul>\n</li>\n<li>Also evaluated the visuals and identified the next most useful ones:<ul class=\"doc_list\">\n<li>system distance matrix</li>\n<li>verification coverage bars</li>\n<li>cumulative surah drift views</li>\n<li>ayah conversion stepper</li>\n<li>evidence coverage views</li>\n</ul>\n</li>\n</ul>\n<h3 id=\"section-17\">Phase 12 — First real primary evidence + comparison views</h3>\n<ul class=\"doc_list\">\n<li>Added the first real primary citations from **al-Dānī’s *al-Bayān***:<ul class=\"doc_list\">\n<li><strong>6 primary citations</strong></li>\n<li>Kuwait 1414هـ / 1994م edition</li>\n<li>page <strong>88</strong></li>\n<li>covering six <strong>Madanī-first</strong> points</li>\n</ul>\n</li>\n<li>Added more review outputs:<ul class=\"doc_list\">\n<li><code class=\"inline_code\">workload.md</code></li>\n<li><code class=\"inline_code\">system-distance.md</code></li>\n<li><code class=\"inline_code\">evidence-ledger.md</code></li>\n</ul>\n</li>\n<li>Added a new <code class=\"inline_code\">/compare</code> route to the site.</li>\n<li>Added new site visuals/data for:<ul class=\"doc_list\">\n<li>system distance matrix</li>\n<li>verification coverage bars</li>\n<li>ranked review workload</li>\n<li>within-surah drift against Kufi</li>\n</ul>\n</li>\n</ul>\n<h3 id=\"section-18\">Phase 13 — Structured source-bundle importer</h3>\n<ul class=\"doc_list\">\n<li>Added an importer for supplied book bundles:<ul class=\"doc_list\">\n<li><code class=\"inline_code\">scripts/source-bundles/import-evidence-from-supplied-bundles.mjs</code></li>\n</ul>\n</li>\n<li>Added <code class=\"inline_code\">/docs/source-bundle-workflow</code>.</li>\n<li>Began using uploaded structured data from classical sources in a disciplined way:<ul class=\"doc_list\">\n<li><strong>البيان</strong> as the primary ingestion layer</li>\n<li><strong>نفائس البيان / شرح الفرائد الحسان</strong> as commentary/adjudication</li>\n</ul>\n</li>\n<li>Imported:<ul class=\"doc_list\">\n<li><strong>40 exact primary matches</strong> from the supplied <code class=\"inline_code\">البيان</code> batch</li>\n<li><strong>111 commentary matches</strong> from the supplied <code class=\"inline_code\">نفائس</code> bundle</li>\n</ul>\n</li>\n<li>Evidence state after the pass:<ul class=\"doc_list\">\n<li><code class=\"inline_code\">primary_cited</code>: <strong>45</strong></li>\n<li><code class=\"inline_code\">secondary_only</code>: <strong>68</strong></li>\n<li><code class=\"inline_code\">disputed</code>: <strong>2</strong></li>\n<li><code class=\"inline_code\">uncited</code>: <strong>131</strong></li>\n</ul>\n</li>\n<li>Surfaced live tension points such as <code class=\"inline_code\">3:92</code>, <code class=\"inline_code\">3:97</code>, and <code class=\"inline_code\">6:73</code>.</li>\n</ul>\n<h3 id=\"section-19\">Phase 14 — Dual use of al-Qāḍī material</h3>\n<ul class=\"doc_list\">\n<li>Extended the importer so the uploaded القاضي material was used in two distinct layers:<ul class=\"doc_list\">\n<li><code class=\"inline_code\">الفرائد الحسان</code> as a direct secondary witness</li>\n<li><code class=\"inline_code\">نفائس البيان</code> as commentary</li>\n</ul>\n</li>\n<li>This meant covered points could now carry multiple witnesses:<ul class=\"doc_list\">\n<li>primary <code class=\"inline_code\">البيان</code></li>\n<li>secondary <code class=\"inline_code\">الفرائد</code></li>\n<li>commentary <code class=\"inline_code\">نفائس</code></li>\n</ul>\n</li>\n<li>Through the then-current frontier (up to <strong>surah 26</strong>), no covered disputed-point record remained uncited.</li>\n<li>Underlying evidence counts became much richer even where status labels did not change.</li>\n</ul>\n<h3 id=\"section-20\">Phase 15 — Integration of a more canonical al-Bayān source</h3>\n<ul class=\"doc_list\">\n<li>Integrated a newer, more canonical structured <strong>البيان في عد آي القرآن</strong> bundle.</li>\n<li>Replaced the checked-in <code class=\"inline_code\">sources/al_bayan/</code> witness with the new source.</li>\n<li>Coverage of the checked-in primary witness became:<ul class=\"doc_list\">\n<li>pilot material</li>\n<li>surahs <strong>2–13</strong></li>\n</ul>\n</li>\n<li>Added generated cross-references:<ul class=\"doc_list\">\n<li><code class=\"inline_code\">dist/review/al-bayan-cross-reference.json</code></li>\n<li><code class=\"inline_code\">dist/review/al-bayan-cross-reference.md</code></li>\n</ul>\n</li>\n<li>Result:<ul class=\"doc_list\">\n<li><strong>52 exact primary matches</strong> across the current checked-in <code class=\"inline_code\">البيان</code> frontier</li>\n<li><strong>3 frontier exceptions</strong> remained explicit:<ul class=\"doc_list\">\n<li><code class=\"inline_code\">3:92:internal:تحبون</code></li>\n<li><code class=\"inline_code\">3:97:internal:إبراهيم</code></li>\n<li><code class=\"inline_code\">6:73:internal:فيكون</code></li>\n</ul>\n</li>\n</ul>\n</li>\n<li>Evidence state after the pass:<ul class=\"doc_list\">\n<li><code class=\"inline_code\">primary_cited</code>: <strong>57</strong></li>\n<li><code class=\"inline_code\">secondary_only</code>: <strong>56</strong></li>\n<li><code class=\"inline_code\">disputed</code>: <strong>2</strong></li>\n<li><code class=\"inline_code\">uncited</code>: <strong>131</strong></li>\n</ul>\n</li>\n</ul>\n<h3 id=\"section-21\">Phase 16 — Developer guide and plain-language project explanation</h3>\n<ul class=\"doc_list\">\n<li>Added a new site page: <strong><code class=\"inline_code\">/developer</code></strong><ul class=\"doc_list\">\n<li>basic usage for Quran apps</li>\n<li>forward mapping examples</li>\n<li>reverse mapping examples</li>\n<li>rawi metadata examples</li>\n<li>surah-count examples</li>\n<li>explanation of <code class=\"inline_code\">mapped</code>, <code class=\"inline_code\">merged</code>, <code class=\"inline_code\">split</code>, and <code class=\"inline_code\">covers_multiple</code></li>\n</ul>\n</li>\n<li>Added a new site page: <strong><code class=\"inline_code\">/project</code></strong><ul class=\"doc_list\">\n<li>plain-language explanation of the problem</li>\n<li>project motivation</li>\n<li>approach and workflow</li>\n<li>how evidence is tied to ground truth</li>\n<li>what the project does and does not claim</li>\n</ul>\n</li>\n<li>Added matching repo docs:<ul class=\"doc_list\">\n<li><code class=\"inline_code\">/docs/developer-usage</code></li>\n<li><code class=\"inline_code\">/docs/project-introduction</code></li>\n</ul>\n</li>\n</ul>\n<h3 id=\"section-22\">Phase 17 — Arabic scholar-facing introduction</h3>\n<ul class=\"doc_list\">\n<li>Added a full Arabic companion introduction:<ul class=\"doc_list\">\n<li><code class=\"inline_code\">/docs/project-introduction-ar</code></li>\n</ul>\n</li>\n<li>Wired an Arabic companion page into the site during that phase.</li>\n<li>Fixed a small missing import in the site (<code class=\"inline_code\">BookOpenCheckIcon</code>).</li>\n</ul>\n<h3 id=\"section-23\">Phase 18 — Wuchale cutover</h3>\n<ul class=\"doc_list\">\n<li>Removed the split <code class=\"inline_code\">/project/ar</code> route from the SPA.</li>\n<li>Switched the site shell to one locale-aware route/component layer.</li>\n<li>Added pre-init language bootstrapping and Wuchale locale loading.</li>\n<li>Replaced direct <code class=\"inline_code\">name_en</code> / <code class=\"inline_code\">name_ar</code> rendering with locale-aware dataset helpers.</li>\n</ul>\n<hr/>\n<h2 id=\"section-24\">Current state after Phase 18</h2>\n<h3 id=\"section-25\">Canonical source layer</h3>\n<p>The repo’s hand-maintained source layer now centers on concise, reviewable files:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">data/counting-systems.json</code></li>\n<li><code class=\"inline_code\">data/qiraat.json</code></li>\n<li><code class=\"inline_code\">data/book-boundary-primitives.json</code></li>\n<li><code class=\"inline_code\">data/book-boundary-evidence.json</code></li>\n</ul>\n<h3 id=\"section-26\">Generated outputs</h3>\n<p>Verbose operational artifacts are generated under <code class=\"inline_code\">dist/</code>, including:</p>\n<ul class=\"doc_list\">\n<li>mappings</li>\n<li>reverse mappings</li>\n<li>rawi metadata views</li>\n<li>surah counts</li>\n<li>boundary-event views</li>\n<li>reconciliation files</li>\n<li>review packets</li>\n<li>source cross-references</li>\n</ul>\n<h3 id=\"section-27\">Evidence state</h3>\n<p>By the end of Phase 17, the evidence ledger stood at:</p>\n<ul class=\"doc_list\">\n<li><strong>57</strong> <code class=\"inline_code\">primary_cited</code></li>\n<li><strong>56</strong> <code class=\"inline_code\">secondary_only</code></li>\n<li><strong>2</strong> <code class=\"inline_code\">disputed</code></li>\n<li><strong>131</strong> <code class=\"inline_code\">uncited</code></li>\n</ul>\n<h3 id=\"section-28\">Public site</h3>\n<p>The site includes:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">/</code></li>\n<li><code class=\"inline_code\">/explorer</code></li>\n<li><code class=\"inline_code\">/compare</code></li>\n<li><code class=\"inline_code\">/systems/:system</code></li>\n<li><code class=\"inline_code\">/surahs/:surah</code></li>\n<li><code class=\"inline_code\">/developer</code></li>\n<li><code class=\"inline_code\">/project</code></li>\n</ul>\n<h3 id=\"section-29\">What the project can now do</h3>\n<ul class=\"doc_list\">\n<li>Represent the six counting systems from a concise, book-shaped primitive layer.</li>\n<li>Generate forward and reverse numbering mappings deterministically.</li>\n<li>Track evidence per disputed boundary point.</li>\n<li>Produce scholar review packets and source cross-references.</li>\n<li>Expose the dataset through a simple SPA for comparison, exploration, and integration guidance.</li>\n</ul>\n<h3 id=\"section-30\">What still remains</h3>\n<p>The main remaining work is no longer structural. It is scholarly and editorial:</p>\n<ul class=\"doc_list\">\n<li>continue the evidence pass beyond the current primary-source frontier</li>\n<li>resolve the remaining frontier exceptions where <code class=\"inline_code\">البيان</code> and later witnesses do not line up cleanly</li>\n<li>move more points from <code class=\"inline_code\">secondary_only</code> and <code class=\"inline_code\">uncited</code> into <code class=\"inline_code\">primary_cited</code></li>\n<li>complete scholar review system by system</li>\n</ul>"
  },
  {
    "slug": "schema-book-boundary-primitives-v1",
    "title": "Book-aligned boundary primitives v1",
    "language": "en",
    "direction": "ltr",
    "group": "schema",
    "sourcePath": "schema/book-boundary-primitives-v1.md",
    "alternateSlug": null,
    "excerpt": "This document defines the scholar-facing primitive layer for ayah-boundary differences.",
    "headers": [
      {
        "id": "section-2",
        "level": 2,
        "title": "Modeling rule"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "Reference frame"
      },
      {
        "id": "section-4",
        "level": 2,
        "title": "File shape"
      },
      {
        "id": "section-5",
        "level": 2,
        "title": "Semantics"
      },
      {
        "id": "section-6",
        "level": 3,
        "title": "Omitted surahs and ayahs"
      },
      {
        "id": "section-7",
        "level": 2,
        "title": "end"
      },
      {
        "id": "section-8",
        "level": 3,
        "title": "Rules for end"
      },
      {
        "id": "section-9",
        "level": 2,
        "title": "internal"
      },
      {
        "id": "section-10",
        "level": 3,
        "title": "Rules for internal"
      },
      {
        "id": "section-11",
        "level": 2,
        "title": "Derivation rules"
      },
      {
        "id": "section-12",
        "level": 3,
        "title": "To reconstruct differences.json"
      },
      {
        "id": "section-13",
        "level": 3,
        "title": "To reconstruct forward mappings"
      },
      {
        "id": "section-14",
        "level": 2,
        "title": "Why this is the right primitive layer"
      },
      {
        "id": "section-15",
        "level": 2,
        "title": "Phase status"
      }
    ],
    "html": "<h1 id=\"section-1\">Book-aligned boundary primitives v1</h1>\n<p>This document defines the <strong>scholar-facing primitive layer</strong> for ayah-boundary differences.</p>\n<p>The goal is not binary compression. The goal is to store the data in the same shape that books of <strong>`add al-ayy</strong> usually present it:</p>\n<ul class=\"doc_list\">\n<li>a <strong>boundary position</strong></li>\n<li>anchored by the <strong>word</strong> named in the source</li>\n<li>plus the <strong>counting systems that count that position as a ra's ayah</strong></li>\n</ul>\n<p>That makes the source layer easier to review against works such as <em>al-Bayan</em>, <em>Jamal al-Qurra'</em>, <em>Nafais al-Bayan</em>, and specialized books on the counting traditions.</p>\n<p>The paired citation and review state for each primitive point lives in <code class=\"inline_code\">data/book-boundary-evidence.json</code>.</p>\n<h2 id=\"section-2\">Modeling rule</h2>\n<p>Each primitive is a <strong>disputed boundary point</strong> (<code class=\"inline_code\">موضع خلاف في عد الآي</code>).</p>\n<p>The primitive does <strong>not</strong> say:</p>\n<ul class=\"doc_list\">\n<li>“merge relative to Kufi”</li>\n<li>“split relative to Kufi”</li>\n<li>“forward target ayah = N”</li>\n</ul>\n<p>Instead it says:</p>\n<ul class=\"doc_list\">\n<li><strong>this word marks a possible ayah ending</strong></li>\n<li><strong>these counting systems count it</strong></li>\n</ul>\n<p>Operational merge/split behavior is then derived from that more book-like statement.</p>\n<h2 id=\"section-3\">Reference frame</h2>\n<p>The repository still uses <strong>Kufi/Hafs</strong> as its runtime reference numbering.</p>\n<p>That reference affects only the container shape:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">surahs.{surah}.{hafs_ayah}.end</code> means the disputed boundary sits at the <strong>end</strong> of that Kufi/Hafs ayah</li>\n<li><code class=\"inline_code\">surahs.{surah}.{hafs_ayah}.internal[]</code> means the disputed boundary sits <strong>inside</strong> that Kufi/Hafs ayah, after the named word</li>\n</ul>\n<p>This is a storage convenience, not the scholarly claim itself.</p>\n<h2 id=\"section-4\">File shape</h2>\n<p><code class=\"inline_code\">data/book-boundary-primitives.json</code></p>\n<pre class=\"code_block\"><code class=\"language-json\">{\n  \"_version\": \"0.1.0\",\n  \"_reference_system\": \"kufi\",\n  \"_counting_system_order\": [\n    \"madani-first\",\n    \"madani-last\",\n    \"makki\",\n    \"basri\",\n    \"dimashqi\",\n    \"kufi\"\n  ],\n  \"surahs\": {\n    \"2\": {\n      \"1\": {\n        \"end\": {\n          \"word\": \"الم\",\n          \"counted_by\": [\"kufi\"]\n        }\n      },\n      \"219\": {\n        \"internal\": [\n          {\n            \"word\": \"ينفقون\",\n            \"counted_by\": [\"madani-first\"]\n          }\n        ],\n        \"end\": {\n          \"word\": \"تتفكرون\",\n          \"counted_by\": [\"makki\", \"basri\", \"dimashqi\", \"kufi\"]\n        }\n      }\n    }\n  }\n}\n</code></pre>\n<h2 id=\"section-5\">Semantics</h2>\n<h3 id=\"section-6\">Omitted surahs and ayahs</h3>\n<p>Omitted surahs and ayahs have <strong>no disputed boundary points</strong>.</p>\n<p>That means:</p>\n<ul class=\"doc_list\">\n<li>all ordinary Kufi/Hafs ayah endings are counted by all systems</li>\n<li>there are no extra internal boundaries to review in those places</li>\n</ul>\n<h2 id=\"section-7\"><code class=\"inline_code\">end</code></h2>\n<p><code class=\"inline_code\">end</code> represents a <strong>disputed end boundary</strong> at the end of the specified Kufi/Hafs ayah.</p>\n<p>Example:</p>\n<pre class=\"code_block\"><code class=\"language-json\">\"1\": {\n  \"end\": {\n    \"word\": \"الم\",\n    \"counted_by\": [\"kufi\"]\n  }\n}\n</code></pre>\n<p>Meaning:</p>\n<ul class=\"doc_list\">\n<li>the ayah ending after <code class=\"inline_code\">الم</code> is a disputed head</li>\n<li>Kufi counts it</li>\n<li>the non-listed systems do not count it there</li>\n</ul>\n<p>In classical prose, this is the kind of statement usually expressed as:</p>\n<ul class=\"doc_list\">\n<li>“عدها الكوفي”</li>\n<li>or “لم يعدها فلان”</li>\n</ul>\n<h3 id=\"section-8\">Rules for <code class=\"inline_code\">end</code></h3>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">counted_by</code> <strong>must include</strong> <code class=\"inline_code\">kufi</code></li>\n<li><code class=\"inline_code\">word</code> is the anchoring word for that end boundary</li>\n<li>only <strong>disputed</strong> end boundaries are listed</li>\n<li>undisputed ends are implicit and omitted</li>\n</ul>\n<h2 id=\"section-9\"><code class=\"inline_code\">internal</code></h2>\n<p><code class=\"inline_code\">internal</code> is an ordered list of <strong>extra disputed boundary points inside</strong> the specified Kufi/Hafs ayah.</p>\n<p>Example:</p>\n<pre class=\"code_block\"><code class=\"language-json\">\"40\": {\n  \"internal\": [\n    { \"word\": \"تحزن\", \"counted_by\": [\"dimashqi\"] },\n    { \"word\": \"فتونا\", \"counted_by\": [\"basri\", \"dimashqi\"] },\n    { \"word\": \"مدين\", \"counted_by\": [\"dimashqi\"] }\n  ]\n}\n</code></pre>\n<p>Meaning:</p>\n<ul class=\"doc_list\">\n<li>these words mark possible internal ayah endings inside the Kufi/Hafs ayah</li>\n<li>each point is counted only by the systems listed in <code class=\"inline_code\">counted_by</code></li>\n</ul>\n<h3 id=\"section-10\">Rules for <code class=\"inline_code\">internal</code></h3>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">counted_by</code> <strong>must not include</strong> <code class=\"inline_code\">kufi</code></li>\n<li>entries are ordered in the textual order implied by the scholarly source lists</li>\n<li>multiple internal boundaries may occur in one ayah</li>\n</ul>\n<h2 id=\"section-11\">Derivation rules</h2>\n<p>This file is the canonical source layer for generated mappings.</p>\n<h3 id=\"section-12\">To reconstruct <code class=\"inline_code\">differences.json</code></h3>\n<p>For each <code class=\"inline_code\">end</code> point:</p>\n<ul class=\"doc_list\">\n<li>emit a <code class=\"inline_code\">merge</code> item for every <strong>non-Kufi</strong> system that is <strong>not</strong> listed in <code class=\"inline_code\">counted_by</code></li>\n</ul>\n<p>For each <code class=\"inline_code\">internal</code> point:</p>\n<ul class=\"doc_list\">\n<li>emit a <code class=\"inline_code\">split</code> item for every system listed in <code class=\"inline_code\">counted_by</code></li>\n</ul>\n<h3 id=\"section-13\">To reconstruct forward mappings</h3>\n<p>For a target counting system:</p>\n<ul class=\"doc_list\">\n<li>start from ordinary Kufi boundaries</li>\n<li>remove every disputed <code class=\"inline_code\">end</code> boundary that the target system does <strong>not</strong> count</li>\n<li>add every disputed <code class=\"inline_code\">internal</code> boundary that the target system <strong>does</strong> count</li>\n<li>sort all counted boundaries in reading order and renumber ayahs</li>\n</ul>\n<h2 id=\"section-14\">Why this is the right primitive layer</h2>\n<p>It is:</p>\n<ul class=\"doc_list\">\n<li><strong>closer to the books</strong> than merge/split deltas</li>\n<li><strong>symmetric</strong> across counting systems</li>\n<li><strong>reviewable by scholars</strong> without reading generated mapping artifacts</li>\n<li>still concise enough that large JSON expansions can become generated artifacts later</li>\n</ul>\n<h2 id=\"section-15\">Phase status</h2>\n<p>In the current phase this file is the <strong>canonical authored scholarly source</strong> for disputed boundaries.</p>\n<p><code class=\"inline_code\">dist/differences.json</code> is generated from it as a legacy compatibility projection, and all non-Kufan mappings are generated from this primitive layer without changing public behavior.</p>"
  },
  {
    "slug": "schema-book-boundary-evidence-v1",
    "title": "Book boundary evidence v1",
    "language": "en",
    "direction": "ltr",
    "group": "schema",
    "sourcePath": "schema/book-boundary-evidence-v1.md",
    "alternateSlug": null,
    "excerpt": "This document defines the canonical scholar-facing evidence sidecar stored at:",
    "headers": [
      {
        "id": "section-2",
        "level": 2,
        "title": "Purpose"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "Top-level shape"
      },
      {
        "id": "section-4",
        "level": 2,
        "title": "Alignment rule"
      },
      {
        "id": "section-5",
        "level": 2,
        "title": "Point fields"
      },
      {
        "id": "section-6",
        "level": 3,
        "title": "Allowed verification_status values"
      },
      {
        "id": "section-7",
        "level": 2,
        "title": "Evidence entries"
      },
      {
        "id": "section-8",
        "level": 3,
        "title": "tier"
      },
      {
        "id": "section-9",
        "level": 3,
        "title": "supports"
      },
      {
        "id": "section-10",
        "level": 3,
        "title": "strength"
      },
      {
        "id": "section-11",
        "level": 2,
        "title": "Reviewer entries"
      },
      {
        "id": "section-12",
        "level": 2,
        "title": "Validation rules"
      },
      {
        "id": "section-13",
        "level": 3,
        "title": "uncited"
      },
      {
        "id": "section-14",
        "level": 3,
        "title": "secondary_only"
      },
      {
        "id": "section-15",
        "level": 3,
        "title": "primary_cited"
      },
      {
        "id": "section-16",
        "level": 3,
        "title": "primary_cited_and_reviewed"
      },
      {
        "id": "section-17",
        "level": 3,
        "title": "disputed / unresolved"
      }
    ],
    "html": "<h1 id=\"section-1\">Book boundary evidence v1</h1>\n<p>This document defines the canonical scholar-facing evidence sidecar stored at:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">data/book-boundary-evidence.json</code></li>\n</ul>\n<p>It is paired one-to-one with:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">data/book-boundary-primitives.json</code></li>\n</ul>\n<h2 id=\"section-2\">Purpose</h2>\n<p>The primitive file stores the scholarly claim.\nThe evidence file stores the support for that claim.</p>\n<h2 id=\"section-3\">Top-level shape</h2>\n<pre class=\"code_block\"><code class=\"language-json\">{\n  \"_version\": \"0.1.0\",\n  \"_description\": \"...\",\n  \"_paired_primitive_file\": \"book-boundary-primitives.json\",\n  \"_counting_system_order\": [\"madani-first\", \"madani-last\", \"makki\", \"basri\", \"dimashqi\", \"kufi\"],\n  \"_verification_status_descriptions\": { \"uncited\": \"...\" },\n  \"_evidence_tier_descriptions\": { \"primary\": \"...\" },\n  \"surahs\": {\n    \"2\": {\n      \"219\": {\n        \"internal\": [\n          {\n            \"word\": \"ينفقون\",\n            \"verification_status\": \"uncited\",\n            \"evidence\": []\n          }\n        ],\n        \"end\": {\n          \"word\": \"تتفكرون\",\n          \"verification_status\": \"uncited\",\n          \"evidence\": []\n        }\n      }\n    }\n  }\n}\n</code></pre>\n<h2 id=\"section-4\">Alignment rule</h2>\n<p>Every disputed point present in <code class=\"inline_code\">book-boundary-primitives.json</code> must have exactly one matching evidence point here.</p>\n<p>Matching means:</p>\n<ul class=\"doc_list\">\n<li>same surah</li>\n<li>same Hafs/Kufi ayah</li>\n<li>same kind (<code class=\"inline_code\">end</code> or <code class=\"inline_code\">internal</code>)</li>\n<li>same <code class=\"inline_code\">word</code></li>\n</ul>\n<h2 id=\"section-5\">Point fields</h2>\n<p>Each evidence point has:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">word</code></li>\n<li><code class=\"inline_code\">verification_status</code></li>\n<li><code class=\"inline_code\">evidence</code></li>\n<li>optional <code class=\"inline_code\">reviewers</code></li>\n<li>optional <code class=\"inline_code\">note</code></li>\n</ul>\n<h3 id=\"section-6\">Allowed <code class=\"inline_code\">verification_status</code> values</h3>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">uncited</code></li>\n<li><code class=\"inline_code\">secondary_only</code></li>\n<li><code class=\"inline_code\">primary_cited</code></li>\n<li><code class=\"inline_code\">primary_cited_and_reviewed</code></li>\n<li><code class=\"inline_code\">disputed</code></li>\n<li><code class=\"inline_code\">unresolved</code></li>\n</ul>\n<h2 id=\"section-7\">Evidence entries</h2>\n<p>Each entry in <code class=\"inline_code\">evidence</code> has:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">tier</code></li>\n<li><code class=\"inline_code\">work</code></li>\n<li>optional <code class=\"inline_code\">edition</code></li>\n<li><code class=\"inline_code\">locator</code></li>\n<li><code class=\"inline_code\">supports</code></li>\n<li><code class=\"inline_code\">strength</code></li>\n<li>optional <code class=\"inline_code\">note</code></li>\n</ul>\n<h3 id=\"section-8\"><code class=\"inline_code\">tier</code></h3>\n<p>Allowed values:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">primary</code></li>\n<li><code class=\"inline_code\">commentary</code></li>\n<li><code class=\"inline_code\">secondary</code></li>\n<li><code class=\"inline_code\">modern-reference</code></li>\n<li><code class=\"inline_code\">api-check</code></li>\n</ul>\n<h3 id=\"section-9\"><code class=\"inline_code\">supports</code></h3>\n<p><code class=\"inline_code\">supports</code> must be a non-empty subset of the paired primitive point's <code class=\"inline_code\">counted_by</code> list.</p>\n<h3 id=\"section-10\"><code class=\"inline_code\">strength</code></h3>\n<p>Allowed values:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">direct</code></li>\n<li><code class=\"inline_code\">derived</code></li>\n</ul>\n<h2 id=\"section-11\">Reviewer entries</h2>\n<p>Each reviewer entry has:</p>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">name</code></li>\n<li>optional <code class=\"inline_code\">role</code></li>\n<li>optional <code class=\"inline_code\">date</code></li>\n<li>optional <code class=\"inline_code\">note</code></li>\n</ul>\n<h2 id=\"section-12\">Validation rules</h2>\n<h3 id=\"section-13\"><code class=\"inline_code\">uncited</code></h3>\n<ul class=\"doc_list\">\n<li><code class=\"inline_code\">evidence</code> must be empty</li>\n<li><code class=\"inline_code\">reviewers</code> must be absent or empty</li>\n</ul>\n<h3 id=\"section-14\"><code class=\"inline_code\">secondary_only</code></h3>\n<ul class=\"doc_list\">\n<li>at least one evidence entry is required</li>\n<li>no evidence entry may use tier <code class=\"inline_code\">primary</code></li>\n<li>the union of all <code class=\"inline_code\">supports</code> entries must cover the full primitive <code class=\"inline_code\">counted_by</code> list</li>\n</ul>\n<h3 id=\"section-15\"><code class=\"inline_code\">primary_cited</code></h3>\n<ul class=\"doc_list\">\n<li>at least one evidence entry is required</li>\n<li>at least one evidence entry must use tier <code class=\"inline_code\">primary</code></li>\n<li>the union of all <code class=\"inline_code\">supports</code> entries must cover the full primitive <code class=\"inline_code\">counted_by</code> list</li>\n</ul>\n<h3 id=\"section-16\"><code class=\"inline_code\">primary_cited_and_reviewed</code></h3>\n<ul class=\"doc_list\">\n<li>all <code class=\"inline_code\">primary_cited</code> rules apply</li>\n<li>at least one reviewer entry is required</li>\n</ul>\n<h3 id=\"section-17\"><code class=\"inline_code\">disputed</code> / <code class=\"inline_code\">unresolved</code></h3>\n<p>These may carry partial evidence while the point remains unsettled.</p>"
  }
]
