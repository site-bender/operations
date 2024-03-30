import repeat from "../repeat"

type PadF = (padder: string) => (times: number) => (str: string) => string
const pad: PadF = padder => times => str =>
	`${repeat(padder)(times)}${str}${repeat(padder)(times)}`

export default pad
