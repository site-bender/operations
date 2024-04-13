import { isNotNullish } from "@sitebender/fp/lib/predicates"

const isBooleanOperation = (
	operation: Operation,
): operation is BooleanOperation =>
	isNotNullish(operation) && operation["returns"] === "boolean"

export default isBooleanOperation
