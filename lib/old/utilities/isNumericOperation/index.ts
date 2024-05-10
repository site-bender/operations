import {
	OperationTags,
	type NumericOperation,
	type Operation,
} from "../../../types"

import isNotNullish from "@sitebender/fp/lib/predicates/isNotNullish"

const isNumericOperation = (
	operation: Operation,
): operation is NumericOperation =>
	isNotNullish(operation) &&
	"_tag" in operation &&
	operation._tag === OperationTags.numeric

export default isNumericOperation
