import { Option } from "@sitebender/fp/lib/option"
import { right } from "@sitebender/fp/lib/either"
import { OperationResult } from "../types"

type FromOption = <A>(o: Option<A>) => OperationResult<A>

const fromOption: FromOption = o => right(o)

export default fromOption
