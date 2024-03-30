import repeat from "../repeat"

type PadEndF = (chars: string) => (times: number) => (str: string) => string
const padEnd: PadEndF = chars => times => str => `${str}${repeat(chars)(times)}`

export default padEnd
