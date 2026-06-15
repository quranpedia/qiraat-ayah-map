import { docs } from './docs.generated.js'

export const doc_groups = [
  {
    id: 'overview',
    title: 'المدخل',
    description: 'ابدأ هنا إذا كنت تريد فهم الفكرة سريعًا ثم الانتقال إلى الدليل المناسب.'
  },
  {
    id: 'curation',
    title: 'التحرير والمراجعة',
    description: 'السياسة التحريرية، والمنهج، ومسار المراجع العلمي.'
  },
  {
    id: 'sources',
    title: 'المصادر والحزم',
    description: 'كيف نقرأ الشواهد المرفقة، وكيف تُنظَّم حزم المصادر داخل المشروع.',
    internal: true
  },
  {
    id: 'planning',
    title: 'الخطة والمراحل',
    description: 'خلفية التنفيذ، وخارطة الموقع، وما تم وما بقي.',
    internal: true
  },
  {
    id: 'schema',
    title: 'العقود والبنية',
    description: 'عقود ملفات الأصول العلمية وملف الشواهد.',
    internal: true
  }
]

const docs_by_slug = new Map(docs.map(doc => [doc.slug, doc]))
const group_by_id = new Map(doc_groups.map(group => [group.id, group]))

function is_internal_doc(doc) {
  return Boolean(doc.internal || group_by_id.get(doc.group)?.internal)
}

export function get_doc(slug) {
  return docs_by_slug.get(slug) ?? null
}

export function get_doc_group(group_id) {
  return group_by_id.get(group_id) ?? null
}

export function get_grouped_docs(language = 'ar', { include_internal = false } = {}) {
  return doc_groups
    .filter(group => include_internal || !group.internal)
    .map(group => ({
      ...group,
      docs: docs
        .filter(doc => doc.group === group.id)
        .filter(doc => include_internal || !is_internal_doc(doc))
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
  const doc = get_doc(slug)

  if (!doc) {
    return { previous: null, next: null }
  }

  const include_internal = is_internal_doc(doc)
  const visible_docs = docs.filter(item => include_internal === is_internal_doc(item))
  const index = visible_docs.findIndex(item => item.slug === slug)

  return {
    previous: visible_docs[index - 1] ?? null,
    next: visible_docs[index + 1] ?? null
  }
}
