import {
	SbOperationTags,
	type NumericOperation,
	type SbOperation,
} from "../../../types"

import isNotNullish from "@sitebender/fp/lib/predicates/isNotNullish"

const isNumericOperation = (
	operation: SbOperation,
): operation is NumericOperation =>
	isNotNullish(operation) &&
	"_tag" in operation &&
	operation._tag === SbOperationTags.numeric

export default isNumericOperation
