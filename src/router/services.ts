import { kebabCase } from 'lodash'

export function getPathByName(name: string, prefix = ''): string {
  return `${prefix}${kebabCase(name)}`
}
