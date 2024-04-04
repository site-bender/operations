import isNotNullish from "../../fp/predicates/isNotNullish"

const isBooleanOperation = (
	operation: Operation,
): operation is BooleanOperation =>
	isNotNullish(operation) && operation["returns"] === "boolean"

export default isBooleanOperation
