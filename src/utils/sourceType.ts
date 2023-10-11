export function sourceType(sourceSrc: string) {
  if (sourceSrc.includes('mp4')) {
    return 'video/mp4'
  } else if (sourceSrc.includes('png')) {
    return 'image/png'
  } else if (sourceSrc.includes('jpeg')) {
    return 'image/jpeg'
  }
}
