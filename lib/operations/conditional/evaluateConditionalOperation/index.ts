import type { SbConditionalOperation } from "../../../types"

import { Either, left, right } from "@sitebender/fp/lib/either"
import { Option, none, some } from "@sitebender/fp/lib/option"
import { pipe } from "@sitebender/fp/lib/functions"
import * as OpResult from "../../operationResult"
import { map } from "@sitebender/fp/lib/array"
import liftNumeric from "../../../old/operations/liftNumerical"
import isEqualTo from "../../../makeConditional/operators/number/isEqualTo"
import isNotEqualTo from "../../../makeConditional/operators/number/isNotEqualTo"
import isLessThan from "../../../makeConditional/operators/number/isLessThan"
import isMoreThan from "../../../makeConditional/operators/number/isMoreThan"
import isAtMost from "../../../makeConditional/operators/number/isAtMost"
import isAtLeast from "../../../makeConditional/operators/number/isAtLeast"

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
							return isEqualTo(operand)(test)
								? right(some(operand))
								: left([`${operand} is not equal to ${test}`])
						case "unequalTo":
							return isNotEqualTo(operand)(test)
								? right(some(operand))
								: left([`${operand} is not unequal to ${test}`])
						case "lessThan":
							return isLessThan(operand)(test)
								? right(some(operand))
								: left([`${operand} is not less than ${test}`])
						case "moreThan":
							return isMoreThan(operand)(test)
								? right(some(operand))
								: left([`${operand} is not more than ${test}`])
						case "noLessThan":
							return isAtLeast(operand)(test)
								? right(some(operand))
								: left([`${operand} is not no less than ${test}`])
						case "noMoreThan":
							const a = isAtMost(operand)(test)
								return a ? right(some(operand))
								: left([`${operand} is not no more than ${test}`])
						default:
							return error(op)
					}
				}),
			)
		}

export default evaluateConditionalNumericOperation
