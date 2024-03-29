type RepeatF = <T>(length: number) => (item: T) => Array<T>
const repeat: RepeatF = length => item =>
	Array.from<typeof item>({ length }).fill(item)

export default repeat
