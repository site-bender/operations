type SplitF = (sep: string) => (s: string) => Array<string>
const split: SplitF = sep => s => s.split(sep)

export default split
