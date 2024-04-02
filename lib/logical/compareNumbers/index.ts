import { pipe } from "fp-ts/lib/function"
import { traverseArray, match } from "fp-ts/lib/Either"
import type { IO } from "fp-ts/lib/IO"

import { left, right } from "../../fp/either"
import { isNone } from "../../fp/option"
import liftNumeric from "../../operations/liftNumerical"

import makeCompare from "./makeCompare"

type CompareNumbers = (
	operation: LogicalNumericalOperation,
) => IO<Either<Array<string>, Option<number>>>

const compareNumbers: CompareNumbers = operation => {
	return pipe(
		[operation.operand, operation.test],
		traverseArray(liftNumeric),
		match(
			errors => () => left(errors),
			([operand, test]: Array<Some<number>>) =>
				() => {
					const result = makeCompare(operation.operation)(operand)(test)()

					if (isNone(result)) {
						return left([`${operation.operation} failed: missing value.`])
					}

					if ((result as Some<number | void>).value == null) {
						return left([`Invalid operation: ${operation.operation}.`])
					}

					return (result as Some<boolean>).value
						? right(operand)
						: left([
								`${operand.value} is not ${operation.operation} ${test.value}.`,
							])
				},
		),
	)
}

export default compareNumbers
