export const removeValueString = (str, type) => {
    let result = str
    switch (type) {
        case "/":
            result = result.replace(/\//g, '')
            break
        default:
            break
    }
    return result
}