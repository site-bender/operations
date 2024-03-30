type RepeatF = (s: string) => (length: number) => string
const repeat: RepeatF = s => length => Array.from({ length }).fill(s).join("")

export default repeat
