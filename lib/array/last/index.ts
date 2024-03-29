import { fromNullable } from "../../fp/option"

type LastF = <T>(arr: Array<T>) => Option<T>
const last: LastF = arr => fromNullable(arr.at(-1))

export default last
