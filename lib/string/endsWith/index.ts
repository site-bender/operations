type EndsWithF = (sub: string) => (str: string) => boolean
const endsWith: EndsWithF = sub => str => str.endsWith(sub)

export default endsWith
