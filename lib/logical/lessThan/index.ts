type LessThanF = (x: number) => (y: number) => boolean
const lessThan: LessThanF = x => y => x < y

export default lessThan
