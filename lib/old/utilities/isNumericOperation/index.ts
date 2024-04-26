import type { NumericOperation, Operation } from "../../../types"

import isNotNullish from "@sitebender/fp/lib/predicates/isNotNullish"

const isNumericOperation = (
	operation: Operation,
): operation is NumericOperation =>
	isNotNullish(operation) && operation["returns"] === "number"

export default isNumericOperation
