import { TypeOfReturn, TypeOfTruncation } from "../../../types/enums.ts"
import type { Injector, SumOperation } from "../../../types/operations.ts"
import type { NumberValue } from "../../../types/values.ts"
import convertOperandToInjector from "../../utilities/convertOperandToInjector/mod.ts"
import addFractions from "./addFractions/mod.ts"
import addIntegers from "./addIntegers/mod.ts"
import addPrecisionNumbers from "./addPrecisionNumbers/mod.ts"
import addRealNumbers from "./addRealNumbers/mod.ts"

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

export default function makeSum(operation: SumOperation): Injector {
	const { decimalPlaces, returnType, truncationType } = operation

	const addends: Array<Injector> = operation.operands.map<Injector>((operand) =>
		convertOperandToInjector(operand, decimalPlaces)
	)

	return function sum() {
		return (summers[returnType as keyof typeof summers] as Summer)?.(
			addends,
			decimalPlaces,
			truncationType,
		)
	}
}
