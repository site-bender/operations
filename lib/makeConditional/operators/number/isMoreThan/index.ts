export type IsMoreThanF = (x: number) => (y: number) => boolean
const isMoreThan: IsMoreThanF = x => y => x > y

export default isMoreThan
