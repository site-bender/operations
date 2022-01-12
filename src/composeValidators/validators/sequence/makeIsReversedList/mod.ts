import type {
	ReversedListConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import type { Operation } from "../../../../types/operations.ts"
import type { Arrays, ListValue } from "../../../../types/values.ts"
import makeError from "../../../utilities/makeError/mod.ts"
import operandToArrayInjector from "../../../utilities/operandToArrayInjector/mod.ts"

export default function makeIsReversedList(constraint: ReversedListConstraint) {
	const { operand } = constraint

	const injector = operandToArrayInjector(operand)

	return function isReversedList<T>(validation: Validation): Validation {
		const injected = injector()?.value as Array<T>
		const { value } = validation

		const arr = operandToArrayInjector(
			value as string | Operation | ListValue | Arrays,
		)
		const toTest = [
			...(arr()?.value as Array<T>).filter((item) => injected.includes(item)),
		].reverse()
		const filtered = injected.filter((item) => toTest.includes(item))

		const test = toTest.reduce(
			(ordered: number, item: T) =>
				filtered.indexOf(item) >= ordered ? filtered.indexOf(item) : Infinity,
			0,
		)

		return test < Infinity ? validation : makeError(validation, constraint)
	}
}
