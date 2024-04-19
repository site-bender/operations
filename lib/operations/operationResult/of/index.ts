import { right } from "@sitebender/fp/lib/either"
import { OperationResult } from "../types"
import { some } from "@sitebender/fp/lib/option"

type Of = <A>(a: A) => OperationResult<A>

const of: Of = a => right(some(a))

export default of
