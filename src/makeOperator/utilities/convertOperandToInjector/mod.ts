import { TypeOfTruncation } from "./../../../types/enums.ts"
import type { Injector, Operation } from "./../../../types/operations.ts"
import type { NumberValue } from "../../../types/values.ts"
import makeOperator from "../../mod.ts"
import truncate from "../truncate/mod.ts"

export default function convertOperandToInjector(
	operand: number | Operation | NumberValue,
	decimalPlaces?: number,
): Injector {
	if (typeof operand === "number") {
		return () => {
			if (typeof decimalPlaces === "number") {
				return {
					datatype: "precision",
					decimalPlaces,
					value: truncate(
						Number(operand),
						TypeOfTruncation.ROUND,
						decimalPlaces,
					) as number,
				}
			}

			if (Number.isInteger(operand)) {
				return {
					datatype: "integer",
					value: operand,
				}
			}

			return {
				datatype: "real",
				value: Number(operand),
			}
		}
	}

	if ((operand as Operation).operatorType) {
		return makeOperator(operand as Operation)
	}

	return () => operand as NumberValue
}
