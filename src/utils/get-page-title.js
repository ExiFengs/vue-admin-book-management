import defaultSettings from '@/settings'

const title = defaultSettings.title || 'book management admin'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
