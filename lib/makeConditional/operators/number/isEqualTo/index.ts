export type IsEqualToF = (x: number) => (y: number) => boolean
const isEqualTo: IsEqualToF = x => y => x === y

export default isEqualTo
