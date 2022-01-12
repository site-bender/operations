import { TypeOfReturn, TypeOfTruncation } from "../../../types/enums.js"
import type {
	Injector,
	Operation,
	SumOperation,
} from "../../../types/operations.js"
import { Value } from "../../../types/values.js"
import type { NumberValue } from "../../../types/values.js"
import makeOperator from "../../mod.js"
import truncate from "../../utilities/truncate/mod.js"
import addFractions from "./addFractions/mod.js"
import addIntegers from "./addIntegers/mod.js"
import addPrecisionNumbers from "./addPrecisionNumbers/mod.js"
import addRealNumbers from "./addRealNumbers/mod.js"

export type Summer = (
	addends: Array<Injector>,
	decimalPlaces?: number,
	truncationType?: TypeOfTruncation,
) => NumberValue

const summers = {
	[TypeOfReturn.FRACTION]: addFractions,
	[TypeOfReturn.INTEGER]: addIntegers,
	[TypeOfReturn.PRECISION_NUMBER]: addPrecisionNumbers,
	[TypeOfReturn.REAL_NUMBER]: addRealNumbers,
}

function isInteger (operand: number): Value {
	return Number.isInteger(operand)
		? {
			datatype: "integer",
			value: operand,
		}
		: {
			datatype: "real",
			value: operand,
		}
}

export default function makeSum(operation: SumOperation): Injector {
	const { decimalPlaces, returnType, truncationType } = operation

	const addends: Array<Injector> = operation.operands.map<Injector>(
		(operand: Operation | NumberValue | number) => {
			if (typeof operand === "number") {
				return () =>
					typeof decimalPlaces === "number"
						? {
							datatype: "precision",
							decimalPlaces,
							value: truncate(operand, TypeOfTruncation.ROUND, decimalPlaces),
						}
						: isInteger(operand)
			}

			if ((operand as Operation).operatorType) {
				return makeOperator(operand as Operation)
			}

			return () => operand
		},
	)

	return function sum() {
		return (summers[returnType as keyof typeof summers] as Summer)?.(
			addends,
			decimalPlaces,
			truncationType,
		)
	}
}
