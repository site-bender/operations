type ReplaceF = (r: RegExp | string) => (sub: string) => (str: string) => string
const replace: ReplaceF = r => sub => str => str.replace(r, sub)

export default replace
