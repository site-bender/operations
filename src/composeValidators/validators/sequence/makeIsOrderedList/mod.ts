import type {
	OrderedListConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import type { ListValue } from '../../../../types/values.ts'
import makeError from '../../../utilities/makeError/mod.ts'
import operandToArrayInjector from '../../../utilities/operandToArrayInjector/mod.ts'

export default function makeIsOrderedList(constraint: OrderedListConstraint) {
	const { operand } = constraint

	const injector = operandToArrayInjector(operand)

	return function isReversedList<T>(validation: Validation): Validation {
		const injected = injector()?.value as Array<T>
		const { value } = validation

		const arr = operandToArrayInjector(value as ListValue)
		const toTest = [...(arr()?.value as Array<T>)]

		const test = toTest.reduce(
			(ordered: number, item: T) =>
				injected.indexOf(item) >= ordered ? injected.indexOf(item) : Infinity,
			0,
		)

		return test < Infinity && toTest.length === injected.length
			? validation
			: makeError(validation, constraint)
	}
}
