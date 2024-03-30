import repeat from "../repeat"

type PadEndToF = (padder: string) => (length: number) => (str: string) => string
const padEndTo: PadEndToF = padder => length => str =>
	`${repeat(padder)(str.length >= length ? 0 : length - str.length)}${str}`

export default padEndTo
