import isNotNullish from "../isNotNullish"

const isNumericOperation = (
	operation: Operation,
): operation is NumericOperation =>
	isNotNullish(operation) && operation["returns"] === "number"

export default isNumericOperation
