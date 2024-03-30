import repeat from "../repeat"

type PadEndF = (padder: string) => (times: number) => (str: string) => string
const padEnd: PadEndF = padder => times => str =>
	`${str}${repeat(padder)(times)}`

export default padEnd
