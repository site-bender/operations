type StartsWithF = (sub: string) => (str: string) => boolean
const startsWith: StartsWithF = sub => str => str.startsWith(sub)

export default startsWith
