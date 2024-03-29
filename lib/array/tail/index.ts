type TailF = <T>(arr: Array<T>) => Array<T>
const tail: TailF = arr => arr.slice(1)

export default tail
