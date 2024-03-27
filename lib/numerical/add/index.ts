import type { Left, Right } from "fp-ts/lib/Either"
import { isLeft, right } from "fp-ts/lib/Either"

import collectErrors from "../../utilities/collectErrors"
import getOperands from "../../utilities/getOperands"

import { ADDITION_IDENTITY } from "../../constants"

type Add = (o: AddOperation) => () => Left<Array<string>> | Right<number>
const add: Add = op => {
	const addends = getOperands(op.addends)("number") as (
		| Left<string[]>
		| Right<number>
	)[]

	const error = collectErrors<number>(addends)

	return isLeft(error as Left<Array<string>>)
		? () => error as Left<Array<string>>
		: () =>
				addends.reduce(
					(sum, operand) =>
						right(
							(operand as Right<number>).right + (sum as Right<number>).right,
						),
					right(ADDITION_IDENTITY),
				) as Right<number>
}

export default add
