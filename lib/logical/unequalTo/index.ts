export type UnequalToF = (x: number) => (y: number) => boolean
const unequalTo: UnequalToF = x => y => x !== y

export default unequalTo
