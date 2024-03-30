type EndsWithF = (substring: string) => (str: string) => boolean
const endsWith: EndsWithF = substring => str => str.endsWith(substring)

export default endsWith
