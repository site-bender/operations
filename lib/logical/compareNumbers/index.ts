import { pipe } from "fp-ts/lib/function"
import type { IO } from "fp-ts/lib/IO"

import { allOf, flatMap, left, right, match } from "../../fp/either"
import { isNone } from "../../fp/option"
import liftNumeric from "../../operations/liftNumerical"

import makeCompare from "./makeCompare"

type CompareNumbers = (
	operation: LogicalNumericalOperation,
) => IO<Either<Array<string>, number>>

const compareNumbers: CompareNumbers = operation => {
	return pipe(
		allOf(liftNumeric)([operation.operand, operation.test]),
		pipe(
			([operand, test]: Array<Option<number>>) =>
				() => {
					if (isNone(operand) || isNone(test)) {
						return left([`${operation.operation} failed: missing value.`])
					}

					return pipe(
						makeCompare(operation.operation)(operand.value)(test.value)(),
						flatMap(result =>
							result
								? right(operand.value)
								: left([
										`${operand.value} is not ${operation.operation} ${test.value}.`,
									]),
						),
					)
				},
			match(errors => () => left(errors)),
		),
	)
}

export default compareNumbers
