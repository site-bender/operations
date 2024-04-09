import isNotNullish from "../../fp/predicates/isNotNullish"

const isInjectableOperation = (
	operation: Operation,
): operation is InjectableOperation =>
	isNotNullish(operation) &&
	["formInput", "sessionStorage", "localStorage"].includes(operation.operation)

export default isInjectableOperation
