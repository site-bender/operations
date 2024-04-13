export type NoMoreThanF = (x: number) => (y: number) => boolean
const noMoreThan: NoMoreThanF = x => y => x <= y

export default noMoreThan
