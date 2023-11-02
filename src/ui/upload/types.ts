export type ImageAccept = 'image/png' | 'image/gif' | 'image/jpeg' | 'image/jpg' | 'image/svg'

export const MaxUploadSize = 1024 * 1024 * 10

export const defaultAccepts: Array<ImageAccept> = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg']

export interface UploadProps {
  modelValue?: string
  defaultValue?: string
  accepts?: Array<ImageAccept> | string
  size?: number
  maxSize?: number
  extra?: Record<string, string>
}
