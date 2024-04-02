type MoreThanF = (x: number) => (y: number) => boolean
const moreThan: MoreThanF = x => y => x > y

export default moreThan
