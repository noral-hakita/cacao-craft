// lib/utils.ts
export function encodeImagePath(path: string): string {
  const parts = path.split('/')
  if (parts.length === 0) return path
  const filename = parts[parts.length - 1]
  const encodedFilename = encodeURIComponent(filename)
  const dirs = parts.slice(0, -1)
  return dirs.length > 0 ? dirs.join('/') + '/' + encodedFilename : '/' + encodedFilename
}