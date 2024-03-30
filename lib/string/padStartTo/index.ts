import repeat from "../repeat"

type PadEndToF = (chars: string) => (length: number) => (str: string) => string
const padEndTo: PadEndToF = chars => length => str =>
	`${repeat(chars)(str.length >= length ? 0 : length - str.length)}${str}`

export default padEndTo
