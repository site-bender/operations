import type { InjectFromArgumentOperation, Operation } from "../../../types"

import { isNotNullish } from "@sitebender/fp/lib/predicates"

const isInjectFromArgumentOperation = (
	operation: InjectFromArgumentOperation | Operation,
): operation is InjectFromArgumentOperation =>
	isNotNullish(operation) && operation.operation === "injectFromArgument"

export default isInjectFromArgumentOperation
