import { docs } from './docs.generated.js'

export const doc_groups = [
  {
    id: 'overview',
    title: 'المدخل',
    description: 'مدخل سريع ثم الوثائق الأساسية التي تشرح فكرة المشروع واستعماله.'
  },
  {
    id: 'curation',
    title: 'التحرير والمراجعة',
    description: 'السياسة التحريرية، والمنهج، ومسار المراجع العلمي.'
  },
  {
    id: 'sources',
    title: 'المصادر والحزم',
    description: 'كيف نقرأ الشواهد المرفقة وكيف تسير حزم المصادر.'
  },
  {
    id: 'planning',
    title: 'الخطة والمراحل',
    description: 'خلفية التنفيذ، وخارطة الموقع، وما تم وما بقي.'
  },
  {
    id: 'schema',
    title: 'العقود والبنية',
    description: 'عقود ملفات الأصول العلمية وملف الشواهد.'
  }
]

const docs_by_slug = new Map(docs.map(doc => [doc.slug, doc]))
const group_by_id = new Map(doc_groups.map(group => [group.id, group]))

export function get_doc(slug) {
  return docs_by_slug.get(slug) ?? null
}

export function get_doc_group(group_id) {
  return group_by_id.get(group_id) ?? null
}

export function get_grouped_docs(language = 'ar') {
  return doc_groups
    .map(group => ({
      ...group,
      docs: docs
        .filter(doc => doc.group === group.id)
        .sort((left, right) => {
          const left_matches = left.language === language ? 0 : 1
          const right_matches = right.language === language ? 0 : 1
          if (left_matches !== right_matches) {
            return left_matches - right_matches
          }

          return left.title.localeCompare(right.title, left.language)
        })
    }))
    .filter(group => group.docs.length)
}

export function get_neighbor_docs(slug) {
  const index = docs.findIndex(doc => doc.slug === slug)

  if (index === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: docs[index - 1] ?? null,
    next: docs[index + 1] ?? null
  }
}
