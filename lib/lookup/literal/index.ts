import { fromNullable, match } from "@sitebender/fp/lib/option"
import { pipe } from "@sitebender/fp/lib/functions"
import { CastableValues, LiteralLookupOperation, Reify } from "../../types"
import { Either, left, right } from "@sitebender/fp/lib/either"

type LookupF = (
	op: LiteralLookupOperation,
) => (key: string) => Either<string[], Reify<CastableValues>>

const lookup: LookupF = op => key =>
	pipe(
		fromNullable(op.test[key]),
		pipe(
			right<Reify<CastableValues>>,
			match(() => left([`Not a valid lookup key: ${key}`])),
		),
	)

export default lookup
