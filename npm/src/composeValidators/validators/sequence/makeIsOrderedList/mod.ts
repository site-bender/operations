import makeOperator from "../../../../makeOperator/mod.js"
import type {
	OrderedListConstraint,
	Validation,
} from "../../../../types/constraints.js"
import { Operation } from "../../../../types/operations.js"
import type { ListValue } from "../../../../types/values.js"
import makeError from "../../../utilities/makeError/mod.js"

export default function makeIsOrderedList(
	constraint: OrderedListConstraint,
): (validation: Validation) => Validation {
	const { operand, separator = "," } = constraint

	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function isOrderedList(validation: Validation): Validation {
		const injected = injector()

		const list: Array<unknown> = typeof injected === "string"
			? injected.split(separator)
			: injected
		const values: Array<unknown> = typeof validation.value === "string"
			? validation.value.split((validation as ListValue).separator || ",")
			: (validation.value as Array<unknown>)

		const test = values.reduce(
			(ordered: number, value: unknown) =>
				list.indexOf(value) >= ordered ? list.indexOf(value) : Infinity,
			0,
		)

		return test < Infinity ? validation : makeError(validation, constraint)
	}
}
