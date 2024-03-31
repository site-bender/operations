import isNotNullish from "../isNotNullish"

const isUnitOperation = (operation: Operation): operation is UnitOperation =>
	isNotNullish(operation) && operation["returns"] === "unit"

export default isUnitOperation
