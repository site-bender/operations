export type NoLessThan = (x: number) => (y: number) => boolean
const noLessThan: NoLessThan = x => y => x >= y

export default noLessThan
