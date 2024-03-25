import type { Either, Left, Right } from "fp-ts/lib/Either"
import { isLeft, right } from "fp-ts/lib/Either"

import collectErrors from "../../utilities/collectErrors"
import getOperands from "../../utilities/getOperands"

import { ADDITION_IDENTITY } from "../../constants"

type Add = (o: AddOperation) => () => Either<Array<string>, number>
const add: Add = (op) => {
	const addends = getOperands(op.addends)("number") as (
		| Left<string[]>
		| Right<number>
	)[]

	const errors = collectErrors(addends)

	return isLeft(errors as Left<Array<string>>)
		? () => errors
		: () =>
				addends.reduce(
					(sum, operand) =>
						right(
							(operand as Right<number>).right + (sum as Right<number>).right,
						),
					right(ADDITION_IDENTITY),
				)
}

export default add
