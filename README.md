<div align="center">

<img src=".github/banner.svg" alt="Qiraat Ayah Map — Data, Stable" width="820">

**Mappings across the six canonical ayah-counting systems, including numbering differences, splits, and merges.**

<a href="https://quran.ws/blocks/qiraat-ayah-map"><img alt="See it work" src="https://img.shields.io/badge/See_it_work-15705D?style=for-the-badge&labelColor=102F29"></a>
<a href="https://quran.ws/docs/reference/qiraat-ayah-map"><img alt="Documentation" src="https://img.shields.io/badge/Documentation-102F29?style=for-the-badge&labelColor=102F29"></a>

</div>

Use it when building for a riwayah other than Hafs and you need to connect its ayahs to Tafsir, translations, recitations, or other resources indexed by Hafs numbering, or whenever you need to convert between ayah-counting systems.

> خريطة تربط الآيات بين مذاهب عدّ الآي الستة، وتوثّق اختلافات الترقيم ومواضع فصل الآيات وضمّها.
>
> استخدمها عندما تعمل على تطبيق برواية غير حفص وتحتاج ربط الآيات بمصادر مبنية على ترقيم حفص، مثل التفاسير والترجمات والتلاوات، أو عندما تحتاج التحويل بين أنظمة عدّ الآي المختلفة.

| | |
|---|---|
| **Package** | `@quran.ws/qiraat-ayah-map` · `0.1.0` |
| **Counting systems** | 6 madhhabs |
| **Qiraat covered** | The ten |
| **Licence** | MIT |

```sh
# not published yet — read data/*.json, or `npm run generate` to build dist/
```

## Where the documentation is

Everything about using it lives on the site. This repository is the source.

| | |
|---|---|
| **Overview and demo** | [quran.ws/blocks/qiraat-ayah-map](https://quran.ws/blocks/qiraat-ayah-map) |
| **Reference** | [quran.ws/docs/reference/qiraat-ayah-map](https://quran.ws/docs/reference/qiraat-ayah-map) |
| **The method** | [quran.ws/docs/reference/qiraat-ayah-map/method](https://quran.ws/docs/reference/qiraat-ayah-map/method) |
| **The source files** | [quran.ws/docs/reference/qiraat-ayah-map/source-files](https://quran.ws/docs/reference/qiraat-ayah-map/source-files) |
| **Map ayah references between counts** | [quran.ws/docs/build/map-ayah-references](https://quran.ws/docs/build/map-ayah-references) |
| **Support multiple riwayat** | [quran.ws/docs/build/multiple-riwayat](https://quran.ws/docs/build/multiple-riwayat) |
| **Licensing in full** | [quran.ws/docs/reference/licensing](https://quran.ws/docs/reference/licensing) |

## What is in here

| | |
|---|---|
| `data/` | the boundary primitives, the evidence sidecar, the counting madhhabs, and the measured printed editions |
| `dist/` | the mapping tables `npm run generate` produces from `data/` |
| `sources/` | the works each claim is cited from |
| `scripts/` | `data/` → `dist/`, reproducible |
| `tests/` | the gates that must stay green, including the public-terminology guardrail |
| `LICENSES/` | per-file licence texts |

## The count attributed to a qāriʾ is not the count a muṣḥaf prints

`data/qiraat.json` carries `counting_system_associated_with_qari` — the madhhab
of ʿadd al-āy a qāriʾ is associated with. `data/printed-editions.json` carries
`counting_system_printed` — what a printed muṣḥaf we have actually measured
carries. Abū ʿAmr is attributed the Baṣrī count; both King Fahd Complex muṣḥafs
of his rāwīs measure onto the First Madinan count. Both facts are true, and a
join that reads one as the other gets a contradiction, so the two never share a
field. See [CONTRIBUTING.md](CONTRIBUTING.md#two-counting-fields-and-which-one-to-join-on).

Issues and pull requests are welcome here. Everything that is not about *changing* this repository is on the site.
