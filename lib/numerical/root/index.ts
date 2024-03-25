import type { Either, Left, Right } from "fp-ts/lib/Either"
import { isLeft, right } from "fp-ts/lib/Either"

import collectErrors from "../../utilities/collectErrors"
import getOperands from "../../utilities/getOperands"

type Root = (o: RootOperation) => () => Either<Array<string>, number>
const root: Root = (op) => {
	const [radicand, index] = getOperands([op.radicand, op.index])("number") as (
		| Left<string[]>
		| Right<number>
	)[]

	const errors = collectErrors([radicand, index])

	return isLeft(errors as Left<Array<string>>)
		? () => errors
		: () =>
				right(
					Math.pow(
						(radicand as Right<number>).right,
						1 / (index as Right<number>).right,
					),
				)
}

export default root
