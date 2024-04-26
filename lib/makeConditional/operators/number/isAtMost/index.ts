export type IsAtMostF = (x: number) => (y: number) => boolean
const isAtMost: IsAtMostF = x => y => x <= y

export default isAtMost
