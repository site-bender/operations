import { TypeOfReturn, TypeOfTruncation } from "../../../types/enums.js"
import type { Injector, SubtractOperation } from "../../../types/operations.js"
import { NumberValue } from "../../../types/values.js"
import makeOperator from "../../mod.js"
import subtractFractions from "./subtractFractions/mod.js"
import subtractIntegers from "./subtractIntegers/mod.js"
import subtractPrecisionNumbers from "./subtractPrecisionNumbers/mod.js"
import subtractRealNumbers from "./subtractRealNumbers/mod.js"

export type Subtractor = (
	minuend: Injector,
	subtrahend: Injector,
	decimalPlaces?: number,
	truncationType?: TypeOfTruncation,
) => NumberValue

const subtractors = {
	[TypeOfReturn.FRACTION]: subtractFractions,
	[TypeOfReturn.INTEGER]: subtractIntegers,
	[TypeOfReturn.PRECISION_NUMBER]: subtractPrecisionNumbers,
	[TypeOfReturn.REAL_NUMBER]: subtractRealNumbers,
}

export default function makeSubtract(operation: SubtractOperation): Injector {
	const { decimalPlaces, minuend, subtrahend, returnType, truncationType } =
		operation

	const left = minuend.operatorType ? makeOperator(minuend) : () => minuend
	const right = subtrahend.operatorType
		? makeOperator(subtrahend)
		: () => subtrahend

	return function subtract() {
		return (
			subtractors[returnType as keyof typeof subtractors] as Subtractor
		)?.(left as Injector, right as Injector, decimalPlaces, truncationType)
	}
}
