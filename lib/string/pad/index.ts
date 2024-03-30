import repeat from "../repeat"

type PadF = (chars: string) => (times: number) => (str: string) => string
const pad: PadF = chars => times => str =>
	`${repeat(chars)(times)}${str}${repeat(chars)(times)}`

export default pad
