export type RepeatItemF = <T>(item: T) => (length: number) => Array<T>

const repeatItem: RepeatItemF = item => length =>
	Array.from<typeof item>({ length }).fill(item)

export default repeatItem
