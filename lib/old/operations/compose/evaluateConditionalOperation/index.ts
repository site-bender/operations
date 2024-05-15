import type { SbConditionalOperation } from "../../../../types"

import { Either, left, right } from "@sitebender/fp/lib/either"
import { Option, none, some } from "@sitebender/fp/lib/option"
import {
	equalTo,
	lessThan,
	moreThan,
	noLessThan,
	noMoreThan,
	unequalTo,
} from "../../../logical"
import { pipe } from "@sitebender/fp/lib/functions"
import * as OpResult from "../../operationResult"
import liftNumeric from "../../liftNumerical"
import {map} from "@sitebender/fp/lib/array"

export type EvaluateConditionalNumericOperation = (
	op: SbConditionalOperation,
) => (input: Option<number>) => Either<Array<string>, Option<number>>

const evaluateConditionalNumericOperation: EvaluateConditionalNumericOperation =

		op =>
		(input = none) => {
			const error = (op: never) =>
				left([`Invalid numeric operation: ${op["operation"] ?? "unknown"}.`])

			return pipe(
				[op.operand, op.test],
				map(liftNumeric(input)),
				OpResult.sequence,
				OpResult.flatMap(([operand, test]) => {
					switch (op.operation) {
						case "equalTo":
							return equalTo(operand)(test)
								? right(some(operand))
								: left([`${operand} is not equal to ${test}`])
						case "unequalTo":
							return unequalTo(operand)(test)
								? right(some(operand))
								: left([`${operand} is not unequal to ${test}`])
						case "lessThan":
							return lessThan(operand)(test)
								? right(some(operand))
								: left([`${operand} is not less than ${test}`])
						case "moreThan":
							return moreThan(operand)(test)
								? right(some(operand))
								: left([`${operand} is not more than ${test}`])
						case "noLessThan":
							return noLessThan(operand)(test)
								? right(some(operand))
								: left([`${operand} is not no less than ${test}`])
						case "noMoreThan":
							return noMoreThan(operand)(test)
								? right(some(operand))
								: left([`${operand} is not no more than ${test}`])
						default:
							return error(op)
					}
				}),
			)
		}

export default evaluateConditionalNumericOperation
