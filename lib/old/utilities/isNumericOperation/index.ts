import type { NumericOperation, Operation } from "../../../types"

import isNotNullish from "@sitebender/fp/lib/predicates/isNotNullish"

const isNumericOperation = (
	operation: Operation,
): operation is NumericOperation =>
	isNotNullish(operation) &&
	"_tag" in operation &&
	operation._tag === "numeric-operation"

export default isNumericOperation
