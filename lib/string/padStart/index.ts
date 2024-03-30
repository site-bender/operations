import repeat from "../repeat"

type PadStartF = (padder: string) => (times: number) => (str: string) => string
const padStart: PadStartF = padder => times => str =>
	`${repeat(padder)(times)}${str}`

export default padStart
