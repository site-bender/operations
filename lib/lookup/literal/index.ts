import { fromNullable, match } from "@sitebender/fp/lib/option"
import { pipe } from "@sitebender/fp/lib/functions"
import { CastableValues, LiteralLookupOperation, Reify } from "../../types"
import { Either, flatMap, left, right } from "@sitebender/fp/lib/either"
import evaluateInjectableOperation from "../../operations/compose/evaluateInjectableOperation"

type LookupF = (
	op: LiteralLookupOperation,
) => () => Either<Array<string>, Reify<CastableValues>>

const lookup: LookupF = op => () =>
	pipe(
		evaluateInjectableOperation(op.operand)(),
		flatMap(key =>
			pipe(
				fromNullable(op.test[String(key)]),
				pipe(
					right,
					match(() => left([`Not a valid lookup key: ${key}`])),
				),
			),
		),
	)

export default lookup
