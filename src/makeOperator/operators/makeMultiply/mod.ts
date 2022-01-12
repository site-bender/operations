import { TypeOfReturn, TypeOfTruncation } from "../../../types/enums.ts"
import type { Injector, MultiplyOperation } from "../../../types/operations.ts"
import type { NumberValue } from "../../../types/values.ts"
import convertOperandToInjector from "../../utilities/convertOperandToInjector/mod.ts"
import multiplyFractions from "./multiplyFractions/mod.ts"
import multiplyIntegers from "./multiplyIntegers/mod.ts"
import multiplyPrecisionNumbers from "./multiplyPrecisionNumbers/mod.ts"
import multiplyRealNumbers from "./multiplyRealNumbers/mod.ts"

export type Multiplier = (
	multiplicands: Array<Injector>,
	decimalPlaces?: number,
	truncationType?: TypeOfTruncation,
) => NumberValue

const multipliers = {
	[TypeOfReturn.FRACTION]: multiplyFractions,
	[TypeOfReturn.INTEGER]: multiplyIntegers,
	[TypeOfReturn.PRECISION_NUMBER]: multiplyPrecisionNumbers,
	[TypeOfReturn.REAL_NUMBER]: multiplyRealNumbers,
}

export default function makeMultiply(operation: MultiplyOperation): Injector {
	const { decimalPlaces, returnType, truncationType } = operation

	const multiplicands: Array<Injector> = operation.operands.map<Injector>(
		(operand) => convertOperandToInjector(operand, decimalPlaces),
	)

	return function multiply() {
		return (
			multipliers[returnType as keyof typeof multipliers] as Multiplier
		)?.(multiplicands, decimalPlaces, truncationType)
	}
}
