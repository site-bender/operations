import { TypeOfReturn, TypeOfTruncation } from "../../../types/enums.js"
import type {
	DivideOperation,
	Injector,
	Operation,
} from "../../../types/operations.js"
import { NumberValue } from "../../../types/values.js"
import makeOperator from "../../mod.js"
import divideFractions from "./divideFractions/mod.js"
import divideIntegers from "./divideIntegers/mod.js"
import dividePrecisionNumbers from "./dividePrecisionNumbers/mod.js"
import divideRealNumbers from "./divideRealNumbers/mod.js"

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
		operation as DivideOperation

	const left = (dividend as Operation).operatorType
		? makeOperator(dividend as Operation)
		: () => dividend
	const right = (divisor as Operation).operatorType
		? makeOperator(divisor as Operation)
		: () => divisor

	return function divide() {
		return (dividers[returnType as keyof typeof dividers] as Divider)?.(
			left as Injector,
			right as Injector,
			decimalPlaces,
			truncationType,
		)
	}
}
