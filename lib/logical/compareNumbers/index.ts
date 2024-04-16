import type { LogicalNumericOperation } from "../../types"

import {
	allOf,
	flatMap,
	left,
	right,
	match,
	Either,
} from "@sitebender/fp/lib/either"
import { Lazy } from "@sitebender/fp/lib/lazy"
import { Option, isNone } from "@sitebender/fp/lib/option"
import liftNumeric from "../../operations/liftNumerical"
import makeCompare from "./makeCompare"
import pipe from "@sitebender/fp/lib/functions/pipe"

export type CompareNumbers = (
	operation: LogicalNumericOperation,
) => Lazy<Either<Array<string>, number>>

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
