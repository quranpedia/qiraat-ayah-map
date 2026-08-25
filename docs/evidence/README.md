# Evidence images

Crops from the scanned King Fahd Complex printings. Each is reproducible from the
source at the page given; nothing is retouched beyond cropping and scaling.

They are here because the three Al-Dūrī printings **disagree with each other**,
which is the practical reason this repository needs to distinguish a counting
madhhab from a particular edition of a muṣḥaf.

| file | source | page | what it shows |
|---|---|---|---|
| `duri-1436-colophon-6217.jpg` | Al-Dūrī, 1436 AH — [IslamHouse](https://d1.islamhouse.com/data/ar/ih_books/single_01/ar_Mushaf_Almadina_Aldouri.pdf) | PDF p. 607 | «وعدد آي القرآن على طريقتهم (٦٢١٧)» |
| `duri-1436-almulk-no-split.jpg` | same | PDF p. 563 | al-Mulk **not** split at ﴿نذير﴾ — 30 ayat |
| `duri-1443-colophon-6214.jpg` | Al-Dūrī, 1443 AH — [archive.org](https://archive.org/details/quran-dury/page/n609/mode/2up) | leaf n610 | same sentence, «(٦٢١٤)» |
| `duri-1443-almulk-split.jpg` | same | PDF p. 565 | al-Mulk **split** at ﴿نذير﴾ — 31 ayat |
| `duri-1429-colophon-6214-maada.jpg` | Al-Dūrī, 1429 AH — [archive.org](https://archive.org/details/quran_douri/page/n525/mode/2up) | leaf n526 | «(٦٢١٤) … ما عدا الآيات المختلف فيها بين أبي جعفر وشيبة» |
| `qalun-colophon-6214-madani-last.jpg` | Qālūn — [archive.org](https://archive.org/details/Qaloon-HD) | PDF p. 611 | «طريقة عدد المدني الأخير … (٦٢١٤)», with al-Dānī's isnād for it verbatim |

## What is and is not shown

All three Al-Dūrī printings declare themselves **«العدد الأول لأهل المدينة»**, yet
1436 states 6217 and leaves al-Mulk whole, while 1443 states 6214 and splits it.
Al-Dānī puts ﴿قد جاءنا نذير﴾ squarely in «ما عدّ الآخر دون الأول» (ص 122), so the
1436 printing is the one that agrees with al-Bayān, and it is the one this
repository's data matches.

**Not shown, and therefore not claimed:** there is no scan here of the 1429
printing's al-Mulk page, so nothing in this repository asserts how that printing
divides it. Only its colophon is evidenced.

The 1429 «ما عدا» clause is *suggestive* of the Abū Jaʿfar/Shayba places this
repository marks `dispute_scope: "riwaya"`, but it does not reduce to them: 6217
− 3 = 6214 only if al-Mulk is left whole, and 1443 — which states the same 6214 —
splits it. Treat the clause as the printings' own acknowledgement that these
places are unsettled, not as an arithmetic identity.
