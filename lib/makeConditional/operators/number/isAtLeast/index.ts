export type IsAtLeastF = (x: number) => (y: number) => boolean
const isAtLeast: IsAtLeastF = x => y => x >= y

export default isAtLeast
