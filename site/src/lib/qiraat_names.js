/**
 * Display names for the ten qiraat, keyed by the slugs used in
 * `used_by_qiraat` on each counting madhhab. Mirrors surah_names.js: the
 * generated site data carries slugs only, so the labels live here.
 *
 * `rawis` lists the two transmitters of each qiraah — these are the names
 * readers actually recognise on a printed mushaf (حفص، ورش، قالون).
 */
export const qiraat_names = {
  nafi: { name_ar: 'نافع', name_en: "Nafi'", rawis_ar: 'قالون وورش', rawis_en: 'Qalun and Warsh' },
  'ibn-kathir': { name_ar: 'ابن كثير', name_en: 'Ibn Kathir', rawis_ar: 'البزي وقنبل', rawis_en: 'Al-Bazzi and Qunbul' },
  'abu-amr': { name_ar: 'أبو عمرو', name_en: 'Abu Amr', rawis_ar: 'الدوري والسوسي', rawis_en: 'Al-Duri and Al-Susi' },
  'ibn-amir': { name_ar: 'ابن عامر', name_en: 'Ibn Amir', rawis_ar: 'هشام وابن ذكوان', rawis_en: 'Hisham and Ibn Dhakwan' },
  asim: { name_ar: 'عاصم', name_en: 'Asim', rawis_ar: 'شعبة وحفص', rawis_en: "Shu'ba and Hafs" },
  hamza: { name_ar: 'حمزة', name_en: 'Hamza', rawis_ar: 'خلف وخلّاد', rawis_en: 'Khalaf and Khallad' },
  kisai: { name_ar: 'الكسائي', name_en: 'Al-Kisai', rawis_ar: 'أبو الحارث والدوري', rawis_en: 'Abu al-Harith and Al-Duri' },
  'abu-jafar': { name_ar: 'أبو جعفر', name_en: "Abu Ja'far", rawis_ar: 'ابن وردان وابن جمّاز', rawis_en: 'Ibn Wardan and Ibn Jammaz' },
  yaqub: { name_ar: 'يعقوب', name_en: "Ya'qub", rawis_ar: 'رويس وروح', rawis_en: 'Ruways and Rawh' },
  khalaf: { name_ar: 'خلف العاشر', name_en: 'Khalaf al-Ashir', rawis_ar: 'إسحاق وإدريس', rawis_en: 'Ishaq and Idris' }
}

export function get_qiraah_name(slug, language = 'ar') {
  const entry = qiraat_names[slug]

  if (!entry) {
    return slug
  }

  return language === 'en' ? entry.name_en : entry.name_ar
}
