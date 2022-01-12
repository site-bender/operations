import makeOperator from "../../../makeOperator/mod.ts"
import type { Operation } from "../../../types/operations.ts"
import type { Arrays, ListValue, Value } from "../../../types/values.ts"

export default function operandToArrayInjector(
	operand: string | Operation | ListValue | Arrays,
	separator: string | RegExp = ",",
): () => Value {
	if (Array.isArray(operand)) {
		return () => ({
			datatype: "array",
			value: operand,
		})
	}

	if (typeof operand === "string") {
		return () => ({
			datatype: "array",
			value: operand.split(separator),
		})
	}

	if ("value" in operand) {
		return operandToArrayInjector(
			operand.value,
			(operand as ListValue).separator,
		)
	}

	if ("operatorType" in operand) {
		return makeOperator(operand as Operation)
	}

	return () => ({
		datatype: "undefined",
		value: undefined,
	})
}
