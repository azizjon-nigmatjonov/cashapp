export const GetImageId = (url) => {
    if (!url) return ''
    const id = url.split('/')[url.split('/')?.length - 1]
    return id
}