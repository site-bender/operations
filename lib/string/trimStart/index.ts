type TrimStartF = (s: string) => string
const trimStart: TrimStartF = s => s.replace(/^\s*/, "")

export default trimStart
