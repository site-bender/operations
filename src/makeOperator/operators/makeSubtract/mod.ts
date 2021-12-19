import { TypeOfReturn, TypeOfTruncation } from '../../../types/enums.ts'
import type { Injector, SubtractOperation } from '../../../types/operations.ts'
import type { NumberValue } from '../../../types/values.ts'
import subtractFractions from './subtractFractions/mod.ts'
import subtractIntegers from './subtractIntegers/mod.ts'
import subtractPrecisionNumbers from './subtractPrecisionNumbers/mod.ts'
import subtractRealNumbers from './subtractRealNumbers/mod.ts'
import convertOperandToInjector from '../../utilities/convertOperandToInjector/mod.ts'

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

	const left = convertOperandToInjector(minuend, decimalPlaces)
	const right = convertOperandToInjector(subtrahend, decimalPlaces)

	return function subtract() {
		return (
			subtractors[returnType as keyof typeof subtractors] as Subtractor
		)?.(left, right, decimalPlaces, truncationType)
	}
}
