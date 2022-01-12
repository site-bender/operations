import { TypeOfReturn, TypeOfTruncation } from "../../../types/enums.ts"
import type { DivideOperation, Injector } from "../../../types/operations.ts"
import type { NumberValue } from "../../../types/values.ts"
import convertOperandToInjector from "../../utilities/convertOperandToInjector/mod.ts"
import divideFractions from "./divideFractions/mod.ts"
import divideIntegers from "./divideIntegers/mod.ts"
import dividePrecisionNumbers from "./dividePrecisionNumbers/mod.ts"
import divideRealNumbers from "./divideRealNumbers/mod.ts"

export type Divider = (
	dividend: Injector,
	divisor: Injector,
	decimalPlaces?: number,
	truncationType?: TypeOfTruncation,
) => NumberValue

const dividers = {
	[TypeOfReturn.FRACTION]: divideFractions,
	[TypeOfReturn.INTEGER]: divideIntegers,
	[TypeOfReturn.PRECISION_NUMBER]: dividePrecisionNumbers,
	[TypeOfReturn.REAL_NUMBER]: divideRealNumbers,
}

export default function makeDivide(operation: DivideOperation): Injector {
	const { decimalPlaces, dividend, divisor, returnType, truncationType } =
		operation

	const left = convertOperandToInjector(dividend, decimalPlaces)
	const right = convertOperandToInjector(divisor, decimalPlaces)

	return function divide() {
		return (dividers[returnType as keyof typeof dividers] as Divider)?.(
			left,
			right,
			decimalPlaces,
			truncationType,
		)
	}
}
