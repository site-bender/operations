type EqualToF = (x: number) => (y: number) => boolean
const equalTo: EqualToF = x => y => x === y

export default equalTo
