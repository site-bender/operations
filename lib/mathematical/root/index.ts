import { isLeft, right } from "../../fp/either"

import collectErrors from "../../utilities/collectErrors"
import getOperands from "../../utilities/getOperands"

type Root = (o: RootOperation) => () => Either<Array<string>, number>
const root: Root = op => {
	const [radicand, index] = getOperands([op.radicand, op.index])("number") as (
		| Left<string[]>
		| Right<number>
	)[]

	const error = collectErrors([radicand, index]) as Left<Array<string>>

	return isLeft(error)
		? () => error
		: () =>
				right(
					Math.pow(
						(radicand as Right<number>).right,
						1 / (index as Right<number>).right,
					),
				)
}

export default root
