type InvalidOperationF = (a: number) => (b: number) => void
const invalidOperation: InvalidOperationF = () => () => undefined

export default invalidOperation
