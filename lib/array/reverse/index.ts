export type ReverseF = <T>(arr: Array<T>) => Array<T>
const reverse: ReverseF = arr => arr.toReversed()

export default reverse
