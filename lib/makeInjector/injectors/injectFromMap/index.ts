import type { OperationResult } from "../../../operations/operationResult/types"
import type { Option } from "@sitebender/fp/lib/option/types"
import type { Reify, SbCastableValue, SbInjectFromMap } from "../../../types"

import * as OpResult from "../../../operations/operationResult"
import flatMap from "@sitebender/fp/lib/option/flatMap"
import fromNullable from "@sitebender/fp/lib/option/fromNullable"
import none from "@sitebender/fp/lib/option/none"
import pipe from "@sitebender/fp/lib/functions/pipe"
import isInjectedOperation from "../../../operations/injected/isInjectedOperation"
import evaluateInjectableOperation from "../../../operations/injected/evaluateInjectableOperation"
import { isNumericOperation } from "../../../old/utilities"
import evaluateNumericOperation from "../../../old/operations/compose/evaluateNumericOperation"
import isConditionalOperation from "../../../operations/conditional/isConditionalOperation"
import evaluateTernaryOperation from "../../../operations/ternary/evaluateTernaryOperation"
import evaluateConditionalNumericOperation from "../../../operations/conditional/evaluateConditionalOperation"
import liftNumeric from "../../../old/operations/liftNumerical"

type InjectFromMapF = <T extends SbCastableValue>(
	op: SbInjectFromMap<T>,
) => (input?: Option<Reify<T>>) => OperationResult<Reify<T>>

const injectFromMap: InjectFromMapF =
	op =>
	(input = none) => {
		const liftOperand = () => {
			if (isInjectedOperation(op.operand))
				return evaluateInjectableOperation(op.operand)
			if (isNumericOperation(op.operand))
				return evaluateNumericOperation(op.operand)
			if (isConditionalOperation(op.operand))
				return evaluateConditionalNumericOperation(op.operand)
			return evaluateTernaryOperation(op.operand)
		}

		return pipe(
			[liftNumeric(none)(op.column), liftOperand()(input as any)], //TODO(@bste) : fix this cast
			OpResult.sequence,
			OpResult.flatMap(([column, key]) =>
				OpResult.fromOption(
					pipe(
						fromNullable(op.test[String(key)]),
						flatMap(row => fromNullable(row[(column as number) - 1])),
					),
				),
			),
		)
	}

export default injectFromMap
