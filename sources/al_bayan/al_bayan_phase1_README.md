# al-Bayan fi Add Ay al-Quran — Phase 1 start

Source file: 5542.json

## What this batch contains

- A normalized section inventory for every heading in the uploaded edition.
- A surah index aligning the source titles to the standard 1–114 surah order.
- A pilot translation and structured-data extraction for سورة الحمد / al-Fatiha.
- A seed controlled vocabulary for schools and core technical terms.

## Basic source facts

- name: البيان في عد آي القرآن
- info: الكتاب: البيان في عدّ آي القرآن
المؤلف: عثمان بن سعيد بن عثمان بن عمر أبو عمرو الداني (ت ٤٤٤هـ)
المحقق: غانم قدوري الحمد
الناشر: مركز المخطوطات والتراث - الكويت
الطبعة: الأولى، ١٤١٤هـ- ١٩٩٤م
عدد الأجزاء: ١
[ترقيم الكتاب موافق للمطبوع]

## Section inventory

- Total heading-based sections: 235
- Total surah entry headings: 114
- Total separate ruus headings: 109

## Known anomalies flagged for later review

- Surahs without a separate ruus heading in the heading index: 5
  - 007 — سورة الأعراف / Al-Araf (inline_or_missing_heading)
  - 017 — سورة الإسراء / Al-Isra (inline_marker)
  - 051 — سورة والذاريات / Adh-Dhariyat (inline_marker)
  - 058 — سورة المجادلة / Al-Mujadila (inline_marker)
  - 061 — سورة الصف / As-Saff (inline_marker)
- Heading normalization: toc 85 'مرؤوس الآي' -> 'ورؤوس الآي'

## Translation policy tested in the pilot

- Keep Arabic technical terms available in the data layer even when translated in prose.
- Preserve attributed disagreement instead of harmonizing it.
- Preserve source surah titles and add canonical modern mappings alongside them.

## Next recommended step

Translate the introductory methodological material and then continue with سورة البقرة using the same aligned schema.