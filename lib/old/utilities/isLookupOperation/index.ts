import type { LookupOperation, Operation } from "../../../types"

import { isNotNullish } from "@sitebender/fp/lib/predicates"

const isLookupOperation = (
	operation: Operation,
): operation is LookupOperation =>
	isNotNullish(operation) &&
	(operation.operation === "getFromMap" ||
		operation.operation === "getFromLookupTable")

export default isLookupOperation
