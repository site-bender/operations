import isNotNullish from "../../fp/predicates/isNotNullish"

const isUnitOperation = (operation: Operation): operation is UnitOperation =>
	isNotNullish(operation) && operation["returns"] === "unit"

export default isUnitOperation
