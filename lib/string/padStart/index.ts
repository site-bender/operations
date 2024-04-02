import repeat from "../repeat"

type PadStartF = (chars: string) => (times: number) => (str: string) => string

const padStart: PadStartF = chars => times => str =>
	`${repeat(chars)(times)}${str}`

export default padStart
