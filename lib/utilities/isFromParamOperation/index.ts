import type { FromParamOperation, Operation } from "../../types"

import { isNotNullish } from "@sitebender/fp/lib/predicates"

const isFromParamOperation = (
	operation: FromParamOperation | Operation,
): operation is FromParamOperation =>
	isNotNullish(operation) && operation.operation === "fromParam"

export default isFromParamOperation
