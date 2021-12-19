import makeOperator from '../../mod.js'
import { TypeOfReturn, TypeOfTruncation } from '../../../types/enums.js'
import type {
	Injector,
	MultiplyOperation,
	Operation,
} from '../../../types/operations.js'
import type { NumberValue } from '../../../types/values.js'
import truncate from '../../utilities/truncate/mod.js'
import multiplyFractions from './multiplyFractions/mod.js'
import multiplyIntegers from './multiplyIntegers/mod.js'
import multiplyPrecisionNumbers from './multiplyPrecisionNumbers/mod.js'
import multiplyRealNumbers from './multiplyRealNumbers/mod.js'

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
		(operand: Operation | NumberValue | number) => {
			if (typeof operand === 'number') {
				return () => {
					if (typeof decimalPlaces === 'number') {
						return {
							datatype: 'precision',
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
							datatype: 'integer',
							value: operand,
						}
					}

					return {
						datatype: 'real',
						value: Number(operand),
					}
				}
			}

			if ((operand as Operation).operatorType) {
				return makeOperator(operand as Operation)
			}

			return () => operand
		},
	)

	return function multiply() {
		return (
			multipliers[returnType as keyof typeof multipliers] as Multiplier
		)?.(multiplicands, decimalPlaces, truncationType)
	}
}
