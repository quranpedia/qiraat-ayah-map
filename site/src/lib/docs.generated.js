export const docs = [
  {
    "slug": "project-introduction-ar",
    "title": "التعريف بالمشروع",
    "group": "overview",
    "language": "ar",
    "direction": "rtl",
    "sourcePath": "project-introduction.ar.md",
    "alternateSlug": "project-introduction",
    "excerpt": "هذا مرجع تفاعلي لرؤوس الآي وارتباطها بترقيم الآيات بين مذاهب العدّ الستة المستعملة مع القراءات العشر.",
    "html": "<h1 id=\"section-1\">التعريف بالمشروع</h1>\n<h2 id=\"section-2\">ما الذي يقدمه المشروع؟</h2>\n<p>هذا مرجع تفاعلي لرؤوس الآي وارتباطها بترقيم الآيات بين مذاهب العدّ الستة المستعملة مع القراءات العشر.</p>\n<p>يعرض الموقع النص في سياقه، ويبيّن عند كل فاصلة مختلف فيها أيّ مذاهب العدّ تعدها رأس آية وأيّها لا يعدها.</p>\n<h2 id=\"section-3\">المسار المقترح للقارئ</h2>\n<p>ابدأ من المصحف لاختيار مذهب العدّ والسورة، ثم افتح تفاصيل رؤوس الآي المختلف فيها عند الحاجة.</p>\n<p>استخدم صفحة أعداد الآي عند الحاجة إلى مجموع السورة أو مجموع القرآن في مذهب عدّ معين.</p>\n<h2 id=\"section-4\">حدود المرجع</h2>\n<p>يركّز المشروع على عدّ الآي وترقيمها، ولا يحاول شرح جميع أوجه الخلاف في القراءات.</p>\n<p>تعرض الواجهة العامة القرار العلمي المختصر، بينما تبقى ملفات الشواهد والتدقيق للمراجعين والمطورين.</p>",
    "headers": [
      {
        "id": "section-1",
        "level": 1,
        "title": "التعريف بالمشروع"
      },
      {
        "id": "section-2",
        "level": 2,
        "title": "ما الذي يقدمه المشروع؟"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "المسار المقترح للقارئ"
      },
      {
        "id": "section-4",
        "level": 2,
        "title": "حدود المرجع"
      }
    ],
    "wordCount": 95,
    "readingMinutes": 1
  },
  {
    "slug": "project-introduction",
    "title": "What this project does",
    "group": "overview",
    "language": "en",
    "direction": "ltr",
    "sourcePath": "project-introduction.md",
    "alternateSlug": "project-introduction-ar",
    "excerpt": "This project is a reference for Qurʾānic heads of ayah and the ayah numbering used by the six counting madhhabs represented in the current data.",
    "html": "<h1 id=\"section-1\">What this project does</h1>\n<h2 id=\"section-2\">Purpose</h2>\n<p>This project is a reference for Qurʾānic heads of ayah and the ayah numbering used by the six counting madhhabs represented in the current data.</p>\n<p>The public site starts from reading context: choose a counting madhhab, open a surah, and inspect the fawāṣil where the counts differ.</p>\n<h2 id=\"section-3\">Researcher workflow</h2>\n<p>Use Mushaf to choose a counting madhhab and surah, Ayah Counts for accepted totals, and Search for direct lookup.</p>\n<p>Developer diagnostics remain available for maintainers, but they are not the main researcher path.</p>\n<h2 id=\"section-4\">Scope</h2>\n<p>The project links ayah numbering and heads of ayah. It does not try to explain every difference among the qirāʾāt.</p>\n<p>Evidence and review metadata are preserved in the data layer without making status labels the center of the public interface.</p>",
    "headers": [
      {
        "id": "section-1",
        "level": 1,
        "title": "What this project does"
      },
      {
        "id": "section-2",
        "level": 2,
        "title": "Purpose"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "Researcher workflow"
      },
      {
        "id": "section-4",
        "level": 2,
        "title": "Scope"
      }
    ],
    "wordCount": 118,
    "readingMinutes": 1
  },
  {
    "slug": "developer-usage",
    "title": "Developer usage",
    "group": "overview",
    "internal": true,
    "language": "en",
    "direction": "ltr",
    "sourcePath": "developer-usage.md",
    "excerpt": "Keep one internal numbering axis. In this repository that operational axis is Kufi/Hafs.",
    "html": "<h1 id=\"section-1\">Developer usage</h1>\n<h2 id=\"section-2\">Stable internal axis</h2>\n<p>Keep one internal numbering axis. In this repository that operational axis is Kufi/Hafs.</p>\n<p>Use the generated linking files only at the boundary between your application and an external numbering convention.</p>\n<h2 id=\"section-3\">Common files</h2>\n<p>Use dist/surah-counts/*.json for accepted surah totals by counting madhhab.</p>\n<p>Use dist/rawis/*.json when an application starts from a rawi name and needs the corresponding counting madhhab.</p>\n<h2 id=\"section-4\">Public UI guidance</h2>\n<p>Show counting madhhab names to readers rather than exposing implementation field names.</p>\n<p>Keep diagnostic distance tables out of the primary scholarly experience.</p>",
    "headers": [
      {
        "id": "section-1",
        "level": 1,
        "title": "Developer usage"
      },
      {
        "id": "section-2",
        "level": 2,
        "title": "Stable internal axis"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "Common files"
      },
      {
        "id": "section-4",
        "level": 2,
        "title": "Public UI guidance"
      }
    ],
    "wordCount": 78,
    "readingMinutes": 1
  },
  {
    "slug": "readme-ar",
    "title": "مرجع عدِّ الآي",
    "group": "overview",
    "language": "ar",
    "direction": "rtl",
    "sourcePath": "README.ar.md",
    "excerpt": "يوفر المستودع بيانات مفتوحة لربط أرقام الآيات بين مذاهب العدّ الستة الحالية.",
    "html": "<h1 id=\"section-1\">مرجع عدِّ الآي</h1>\n<h2 id=\"section-2\">مختصر</h2>\n<p>يوفر المستودع بيانات مفتوحة لربط أرقام الآيات بين مذاهب العدّ الستة الحالية.</p>\n<p>تُشتق ملفات العرض من أصل علمي صغير يصف رؤوس الآي المختلف فيها.</p>\n<h2 id=\"section-3\">أين تبدأ؟</h2>\n<p>ابدأ من صفحة المصحف إذا أردت القراءة، ومن صفحة أعداد الآي إذا أردت المجاميع، ومن صفحة المطور إذا أردت دمج البيانات في تطبيق.</p>",
    "headers": [
      {
        "id": "section-1",
        "level": 1,
        "title": "مرجع عدِّ الآي"
      },
      {
        "id": "section-2",
        "level": 2,
        "title": "مختصر"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "أين تبدأ؟"
      }
    ],
    "wordCount": 47,
    "readingMinutes": 1
  },
  {
    "slug": "editorial-policy",
    "title": "Editorial policy",
    "group": "curation",
    "language": "en",
    "direction": "ltr",
    "sourcePath": "editorial-policy.md",
    "excerpt": "Record the smallest reviewable claim: a fāṣilah location and the counting madhhabs that count it as a head of ayah.",
    "html": "<h1 id=\"section-1\">Editorial policy</h1>\n<h2 id=\"section-2\">Principle</h2>\n<p>Record the smallest reviewable claim: a fāṣilah location and the counting madhhabs that count it as a head of ayah.</p>\n<p>Generated outputs must be reproducible from that source layer.</p>\n<h2 id=\"section-3\">Evidence</h2>\n<p>Evidence records support or qualify the claim. They should not be hidden inside generated display files.</p>\n<p>Unsettled points should remain visible to maintainers until reviewed.</p>\n<h2 id=\"section-4\">Public presentation</h2>\n<p>The researcher interface should emphasize the decision at the ayah head, not internal status badges or diagnostic metrics.</p>",
    "headers": [
      {
        "id": "section-1",
        "level": 1,
        "title": "Editorial policy"
      },
      {
        "id": "section-2",
        "level": 2,
        "title": "Principle"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "Evidence"
      },
      {
        "id": "section-4",
        "level": 2,
        "title": "Public presentation"
      }
    ],
    "wordCount": 72,
    "readingMinutes": 1
  },
  {
    "slug": "methodology",
    "title": "Methodology",
    "group": "curation",
    "language": "en",
    "direction": "ltr",
    "sourcePath": "methodology.md",
    "excerpt": "The hand-maintained primitive layer records disputed heads of ayah against the Kufi/Hafs operational axis.",
    "html": "<h1 id=\"section-1\">Methodology</h1>\n<h2 id=\"section-2\">Source model</h2>\n<p>The hand-maintained primitive layer records disputed heads of ayah against the Kufi/Hafs operational axis.</p>\n<p>From that compact layer the project derives surah counts, rawi views, and developer linking files.</p>\n<h2 id=\"section-3\">Mushaf display</h2>\n<p>The mushaf viewer must number ayahs according to the selected counting madhhab.</p>\n<p>When a madhhab does not count the opening basmalah of al-Fātiḥah, the viewer displays it as an unnumbered preamble rather than forcing it into ayah one.</p>\n<h2 id=\"section-4\">Validation</h2>\n<p>The validation suite checks structural consistency, generated outputs, and the selected-madhhab mushaf display across all surahs.</p>",
    "headers": [
      {
        "id": "section-1",
        "level": 1,
        "title": "Methodology"
      },
      {
        "id": "section-2",
        "level": 2,
        "title": "Source model"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "Mushaf display"
      },
      {
        "id": "section-4",
        "level": 2,
        "title": "Validation"
      }
    ],
    "wordCount": 83,
    "readingMinutes": 1
  },
  {
    "slug": "reviewer-guide-ar",
    "title": "دليل المراجع العلمي",
    "group": "curation",
    "language": "ar",
    "direction": "rtl",
    "sourcePath": "reviewer-guide.ar.md",
    "excerpt": "المطلوب من المراجع فحص رأس الآية المختلف فيه: موضع الفاصلة، ونسبتها إلى مذاهب العدّ المذكورة.",
    "html": "<h1 id=\"section-1\">دليل المراجع العلمي</h1>\n<h2 id=\"section-2\">مهمة المراجع</h2>\n<p>المطلوب من المراجع فحص رأس الآية المختلف فيه: موضع الفاصلة، ونسبتها إلى مذاهب العدّ المذكورة.</p>\n<p>العمل العلمي يكون على الدعوى وشاهدها، لا على جداول الصيانة أو المؤشرات التشخيصية.</p>\n<h2 id=\"section-3\">حقول مهمة</h2>\n<p>counted_by يبين مذاهب العدّ التي تعد الفاصلة رأس آية.</p>\n<p>word يحفظ لفظ الفاصلة المستعمل لربط الموضع بالنص.</p>\n<h2 id=\"section-4\">نتيجة المراجعة</h2>\n<p>إن ظهر خلاف في الشواهد، يبقى الموضع صريحًا في ملفات المراجعة حتى يحسمه المختصون.</p>",
    "headers": [
      {
        "id": "section-1",
        "level": 1,
        "title": "دليل المراجع العلمي"
      },
      {
        "id": "section-2",
        "level": 2,
        "title": "مهمة المراجع"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "حقول مهمة"
      },
      {
        "id": "section-4",
        "level": 2,
        "title": "نتيجة المراجعة"
      }
    ],
    "wordCount": 58,
    "readingMinutes": 1
  },
  {
    "slug": "source-catalog",
    "title": "Source catalog",
    "group": "sources",
    "language": "en",
    "direction": "ltr",
    "sourcePath": "source-catalog.md",
    "excerpt": "The sources directory stores structured witness material used to support boundary evidence.",
    "html": "<h1 id=\"section-1\">Source catalog</h1>\n<h2 id=\"section-2\">Purpose</h2>\n<p>The sources directory stores structured witness material used to support boundary evidence.</p>\n<p>Checked-in source data should remain auditable and separate from generated display files.</p>\n<h2 id=\"section-3\">Current use</h2>\n<p>Primary and later witnesses can be recorded independently so reviewers can see what each source supports.</p>",
    "headers": [
      {
        "id": "section-1",
        "level": 1,
        "title": "Source catalog"
      },
      {
        "id": "section-2",
        "level": 2,
        "title": "Purpose"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "Current use"
      }
    ],
    "wordCount": 40,
    "readingMinutes": 1
  },
  {
    "slug": "source-bundle-workflow",
    "title": "Source bundle workflow",
    "group": "sources",
    "language": "en",
    "direction": "ltr",
    "sourcePath": "source-bundle-workflow.md",
    "excerpt": "A supplied source bundle may propose evidence entries, but the checked-in evidence file remains the authoritative project state.",
    "html": "<h1 id=\"section-1\">Source bundle workflow</h1>\n<h2 id=\"section-2\">Workflow</h2>\n<p>A supplied source bundle may propose evidence entries, but the checked-in evidence file remains the authoritative project state.</p>\n<p>Imports should make disagreement explicit instead of silently reshaping the primitive claim.</p>\n<h2 id=\"section-3\">Review</h2>\n<p>After import, run generation and validation so source changes, generated outputs, and review artifacts remain synchronized.</p>",
    "headers": [
      {
        "id": "section-1",
        "level": 1,
        "title": "Source bundle workflow"
      },
      {
        "id": "section-2",
        "level": 2,
        "title": "Workflow"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "Review"
      }
    ],
    "wordCount": 46,
    "readingMinutes": 1
  },
  {
    "slug": "schema-book-boundary-primitives-v1",
    "title": "Schema: book-boundary-primitives v1",
    "group": "schema",
    "language": "en",
    "direction": "ltr",
    "sourcePath": "schema/book-boundary-primitives-v1.md",
    "excerpt": "This schema describes the compact source layer for disputed heads of ayah.",
    "html": "<h1 id=\"section-1\">Schema: book-boundary-primitives v1</h1>\n<h2 id=\"section-2\">Purpose</h2>\n<p>This schema describes the compact source layer for disputed heads of ayah.</p>\n<p>Each item identifies the surah, Kufi/Hafs ayah context, fāṣilah word, boundary kind, and counting madhhabs that count it.</p>\n<h2 id=\"section-3\">Rule</h2>\n<p>Do not duplicate generated totals in this file; derive them from the primitive claims.</p>",
    "headers": [
      {
        "id": "section-1",
        "level": 1,
        "title": "Schema: book-boundary-primitives v1"
      },
      {
        "id": "section-2",
        "level": 2,
        "title": "Purpose"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "Rule"
      }
    ],
    "wordCount": 44,
    "readingMinutes": 1
  },
  {
    "slug": "schema-book-boundary-evidence-v1",
    "title": "Schema: book-boundary-evidence v1",
    "group": "schema",
    "language": "en",
    "direction": "ltr",
    "sourcePath": "schema/book-boundary-evidence-v1.md",
    "excerpt": "This schema records witnesses, notes, review information, and unresolved issues for each primitive boundary claim.",
    "html": "<h1 id=\"section-1\">Schema: book-boundary-evidence v1</h1>\n<h2 id=\"section-2\">Purpose</h2>\n<p>This schema records witnesses, notes, review information, and unresolved issues for each primitive boundary claim.</p>\n<p>It supports maintainers without requiring the public interface to expose status labels as product features.</p>\n<h2 id=\"section-3\">Rule</h2>\n<p>Evidence can explain or challenge a claim; any change to the claim itself must happen in the primitive source layer.</p>",
    "headers": [
      {
        "id": "section-1",
        "level": 1,
        "title": "Schema: book-boundary-evidence v1"
      },
      {
        "id": "section-2",
        "level": 2,
        "title": "Purpose"
      },
      {
        "id": "section-3",
        "level": 2,
        "title": "Rule"
      }
    ],
    "wordCount": 50,
    "readingMinutes": 1
  }
]
