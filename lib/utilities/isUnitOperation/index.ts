import isNotNullish from "@sitebender/fp/lib/predicates/isNotNullish"

const isInjectableOperation = (
	operation: Operation,
): operation is InjectableOperation =>
	isNotNullish(operation) &&
	["formInput", "sessionStorage", "localStorage"].includes(operation.operation)

export default isInjectableOperation
