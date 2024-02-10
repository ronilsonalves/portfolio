import type { Image } from 'sanity'

export interface MilestoneItem {
    description?: string
    duration?: {
      start?: string
      end?: string
    }
    image?: Image
    tags?: string[]
    title?: string
}