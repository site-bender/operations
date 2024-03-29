type TrimEndF = (s: string) => string
const trimEnd: TrimEndF = s => s.replace(/\s*$/, "")

export default trimEnd
