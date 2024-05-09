import type { BooleanOperation, Operation } from "../../../types"

import { isNotNullish } from "@sitebender/fp/lib/predicates"

const isBooleanOperation = (
	operation: Operation,
): operation is BooleanOperation =>
	isNotNullish(operation) &&
	"returns" in operation &&
	operation.returns === "boolean"

export default isBooleanOperation
