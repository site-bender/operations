import makeOperator from '..'
import type {
	Injector,
	MinimumOperation,
	Operation,
} from '../../types/operations'
import type {
	FractionValue,
	IntegerValue,
	NonFractionValue,
	NumberValue,
	RealNumberValue,
} from '../../types/values'

export default function makeMinimum(operation: MinimumOperation): Injector {
	const { operands } = operation as MinimumOperation

	const values = operands.map((operand) =>
		(operand as Operation).operatorType
			? makeOperator(operand as Operation)
			: () => operand,
	) as unknown as Array<() => NumberValue | number>

	return function minimum() {
		const injector: () => NumberValue | number = values.sort((a, b) => {
			const first = a() as NumberValue | number
			const second = b() as NumberValue | number

			const left: number =
				typeof first === 'number'
					? first
					: (first as NumberValue).datatype === 'fraction'
					? (first as FractionValue).value.numerator /
					  (first as FractionValue).value.denominator
					: (first as NonFractionValue).value
			const right: number =
				typeof second === 'number'
					? second
					: (second as NumberValue).datatype === 'fraction'
					? (second as FractionValue).value.numerator /
					  (second as FractionValue).value.denominator
					: (second as NonFractionValue).value

			return left === right ? 0 : (left - right) / Math.abs(left - right)
		})[0]

		const value = injector ? injector() : NaN

		if (typeof value === 'number') {
			return Number.isInteger(value)
				? ({ datatype: 'integer', value } as IntegerValue)
				: ({ datatype: 'real', value } as RealNumberValue)
		}

		return value
	}
}
