type Compact = <T>(arr: Array<T>) => Array<T>
const compact: Compact = arr =>
	arr.filter(item => item !== undefined && item !== null)

export default compact
