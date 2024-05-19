import type { OperationResult } from "../types"
import right from "@sitebender/fp/lib/either/right"
import some from "@sitebender/fp/lib/option/some"

type Of = <A>(a: A) => OperationResult<A>

const of: Of = a => right(some(a))

export default of
