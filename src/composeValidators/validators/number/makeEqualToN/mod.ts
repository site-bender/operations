import makeOperator from "../../../../makeOperator/mod.ts"
import type {
	EqualToNConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import type { Operation } from "../../../../types/operations.ts"
import type { Fraction, NumberValue } from "../../../../types/values.ts"
import makeError from "../../../utilities/makeError/mod.ts"

function isFraction (value: number | Fraction) {
	return typeof value === "number"
		? value
		: (value as Fraction).numerator / (value as Fraction).denominator
}

export default function makeEqualToN(
	constraint: EqualToNConstraint,
): (validation: Validation) => Validation {
	const { operand } = constraint
	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function equalToN(validation: Validation): Validation {
		const injected = injector() as NumberValue | number
		const testValue: number = typeof injected === "number"
			? injected
			: isFraction(injected.value)
		const value: number = typeof validation.value === "number"
			? validation.value
			: (validation.value as Fraction).numerator /
				(validation.value as Fraction).denominator

		return value === testValue ? validation : makeError(validation, constraint)
	}
}
