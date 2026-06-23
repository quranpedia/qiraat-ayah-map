export const primary_navigation_items = [
  {
    id: 'mushaf',
    href: '/mushaf',
    label_ar: 'المصحف',
    label_en: 'Mushaf',
    active_paths: ['/mushaf', '/surahs']
  },
  {
    id: 'ayah-counts',
    href: '/ayah-counts',
    label_ar: 'أعداد الآي',
    label_en: 'Ayah Counts',
    active_paths: ['/ayah-counts', '/madhhabs', '/systems']
  },
  {
    id: 'explorer',
    href: '/explorer',
    label_ar: 'البحث',
    label_en: 'Search',
    active_paths: ['/explorer']
  },
  {
    id: 'project',
    href: '/project',
    label_ar: 'المشروع',
    label_en: 'Project',
    active_paths: ['/project']
  }
]

export const secondary_navigation_items = [
  {
    id: 'docs',
    href: '/docs',
    label_ar: 'الوثائق',
    label_en: 'Docs',
    active_paths: ['/docs']
  },
  {
    id: 'developer',
    href: '/developer',
    label_ar: 'للمطور',
    label_en: 'Developer',
    active_paths: ['/developer', '/compare']
  }
]

export function route_matches(item, path = '/') {
  return item.active_paths.some(activePath => path === activePath || path.startsWith(activePath + '/'))
}
