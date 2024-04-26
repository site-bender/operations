export type IsLessThanF = (x: number) => (y: number) => boolean
const isLessThan: IsLessThanF = x => y => x < y

export default isLessThan
