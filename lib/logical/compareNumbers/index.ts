import type { IO } from "fp-ts/lib/IO"
import { isLeft, left } from "../../fp/either"

import collectErrors from "../../utilities/collectErrors"
import getOperands from "../../utilities/getOperands"

type GetComparison = (
	o: Operation["operation"],
) => (
	op: Either<Array<string>, number>,
) => (t: Either<Array<string>, number>) => IO<Either<Array<string>, number>>
const getComparison: GetComparison = operation => operand => test => {
	switch (operation) {
		case "lessThan":
			return () =>
				(operand as Right<number>).right < (test as Right<number>).right
					? operand
					: left([
							`Value ${(operand as Right<number>).right} is not less than ${(test as Right<number>).right}.`,
						])
		case "greaterThan":
			return () =>
				(operand as Right<number>).right > (test as Right<number>).right
					? operand
					: left([
							`Value ${(operand as Right<number>).right} is not greater than ${(test as Right<number>).right}.`,
						])
		case "noLessThan":
			return () =>
				(operand as Right<number>).right >= (test as Right<number>).right
					? operand
					: left([
							`Value ${(operand as Right<number>).right} is not at least ${(test as Right<number>).right}.`,
						])
		case "noMoreThan":
			return () =>
				(operand as Right<number>).right <= (test as Right<number>).right
					? operand
					: left([
							`Value ${(operand as Right<number>).right} is not at most ${(test as Right<number>).right}.`,
						])
		case "equalTo":
			return () =>
				(operand as Right<number>).right === (test as Right<number>).right
					? operand
					: left([
							`Value ${(operand as Right<number>).right} is not equal to ${(test as Right<number>).right}.`,
						])
		default:
			return () =>
				(operand as Right<number>).right !== (test as Right<number>).right
					? operand
					: left([
							`Value ${(operand as Right<number>).right} is not unequal to ${(test as Right<number>).right}.`,
						])
	}
}

type CompareNumbers = (
	o: LogicalNumericalOperation,
) => () => Either<Array<string>, number>
const compareNumbers: CompareNumbers = op => {
	const [operand, test] = getOperands([op.operand, op.test])("number") as (
		| Left<string[]>
		| Right<number>
	)[]

	const error = collectErrors([operand, test]) as Left<Array<string>>

	return isLeft(error)
		? () => error
		: getComparison(op.operation)(operand)(test)
}

export default compareNumbers
