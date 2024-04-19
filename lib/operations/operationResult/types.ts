import { Either } from "@sitebender/fp/lib/either"
import { Option } from "@sitebender/fp/lib/option"

export type OperationResult<A> = Either<string[], Option<A>>
