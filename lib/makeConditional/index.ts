import fromNullable from "@sitebender/fp/lib/option/fromNullable"
import map from "@sitebender/fp/lib/option/map"
import right from "@sitebender/fp/lib/either/right"
import { default as mapEither } from "@sitebender/fp/lib/either/map"
import flatMap from "@sitebender/fp/lib/either/flatMap"
import { OperationResult } from "../old/operations/operationResult/types"
import { SbConditionalOperation } from "../types"
import { castValue } from "../old/utilities"
import pipe from "@sitebender/fp/lib/functions/pipe"
import some from "@sitebender/fp/lib/option/some"
import { Option, getOrElse, none } from "@sitebender/fp/lib/option"
import liftConditional from "../operations/conditional/liftConditional"

type MakeConditional = (
	op: SbConditionalOperation,
) => (value?: string) => OperationResult<boolean>

const makeConditional: MakeConditional = op => input => {
	const liftedInput = pipe(
		input,
		fromNullable,
		map(castValue("number")),
		map(eitherNum => pipe(eitherNum, mapEither(some))),
		getOrElse(() => right<Option<number>, string[]>(none)),
	)

	return pipe(
		liftedInput,
		flatMap(inputNum => liftConditional(inputNum)(op)),
	)
}

export default makeConditional
