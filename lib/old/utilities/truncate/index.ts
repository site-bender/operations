import { pipe } from "@sitebender/fp/lib/functions"
import { type SbTruncateOperation } from "../../../types"
import liftNumeric from "../../operations/liftNumerical"
import { none } from "@sitebender/fp/lib/option"
import { map } from "../../../operations/operationResult"
import { OperationResult } from "../../../operations/operationResult/types"
import makeInjectedNumber from "../../../operations/injected/makeInjectedConstant/makeInjectedNumber"

export type TruncateF = (op: SbTruncateOperation) => OperationResult<number>

const truncate: TruncateF = trunc => {
	return pipe(
		trunc.operand,
		liftNumeric(none),
		map(value => {
			const { method = "round", precision = makeInjectedNumber(0) } = trunc
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
