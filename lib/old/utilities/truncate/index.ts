import { pipe } from "@sitebender/fp/lib/functions"
import makeNumericConstant from "../../../constants/numericConstant"
import { type TruncateOperation } from "../../../types"
import liftNumeric from "../../operations/liftNumerical"
import { none } from "@sitebender/fp/lib/option"
import { map } from "../../operations/operationResult"
import { OperationResult } from "../../operations/operationResult/types"

export type TruncateF = (op: TruncateOperation) => OperationResult<number>

const truncate: TruncateF = trunc => {
	return pipe(
		trunc.operand,
		liftNumeric(none),
		map(value => {
			const { method = "round", precision = makeNumericConstant(0) } = trunc
			const multiplier = Math.pow(10, precision.value)
			const val = value * multiplier

			switch (method) {
				case "ceiling":
					return Math.ceil(val) / multiplier
				case "round":
					return Math.round(val) / multiplier
				case "floor":
					return Math.floor(val) / multiplier
				default:
					return Math.trunc(val) / multiplier
			}
		}),
	)
}

export default truncate
