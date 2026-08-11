import { docs } from './docs.generated.js'

// Group labels carry both languages directly: this module is outside the
// message-extraction globs, so an English reader would otherwise see Arabic
// headings here.
export const doc_groups = [
  {
    id: 'overview',
    title_ar: 'المدخل',
    title_en: 'Overview'
  },
  {
    id: 'curation',
    title_ar: 'التحرير والمراجعة',
    title_en: 'Editing and review'
  },
  {
    id: 'sources',
    title_ar: 'المصادر',
    title_en: 'Sources',
    description_ar: 'من أين تأتي الشواهد، وكيف تُستورد.',
    description_en: 'Where the evidence comes from, and how it is imported.',
    internal: true
  },
  {
    id: 'schema',
    title_ar: 'بنية الملفات',
    title_en: 'File structure',
    description_ar: 'عقد ملفّ الأصل وملفّ الشواهد.',
    description_en: 'The contracts for the source and evidence files.',
    internal: true
  }
]

function localize_group(group, language) {
  return {
    ...group,
    title: language === 'en' ? group.title_en : group.title_ar,
    description: language === 'en' ? group.description_en : group.description_ar
  }
}

// Ordered entry path for a first-time reader, most general first. Each slug is
// resolved to the reader's language below, so an Arabic path never hands over an
// English document mid-way.
export const start_here_slugs = ['project-introduction-ar', 'methodology-ar', 'reviewer-guide-ar']

const docs_by_slug = new Map(docs.map(doc => [doc.slug, doc]))
const group_by_id = new Map(doc_groups.map(group => [group.id, group]))

function is_internal_doc(doc) {
  return Boolean(doc.internal || group_by_id.get(doc.group)?.internal)
}

function has_translation(doc, language) {
  const alternate = doc.alternateSlug ? docs_by_slug.get(doc.alternateSlug) : null
  return alternate?.language === language
}

export function get_doc(slug) {
  return docs_by_slug.get(slug) ?? null
}

export function get_start_here_docs(language = 'ar') {
  return start_here_slugs
    .map(slug => {
      const doc = docs_by_slug.get(slug)

      if (!doc || doc.language === language) {
        return doc
      }

      const alternate = doc.alternateSlug ? docs_by_slug.get(doc.alternateSlug) : null
      return alternate?.language === language ? alternate : doc
    })
    .filter(Boolean)
}

export function get_doc_group(group_id, language = 'ar') {
  const group = group_by_id.get(group_id)
  return group ? localize_group(group, language) : null
}

export function get_grouped_docs(language = 'ar', { include_internal = false } = {}) {
  return doc_groups
    .filter(group => include_internal || !group.internal)
    .map(group => ({
      ...localize_group(group, language),
      docs: docs
        .filter(doc => doc.group === group.id)
        .filter(doc => include_internal || !is_internal_doc(doc))
        // Collapse translation pairs: list the reader's language, and keep a
        // document in the other language only when it has no counterpart.
        .filter(doc => doc.language === language || !has_translation(doc, language))
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
