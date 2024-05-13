import {
	SbOperationTags,
	type SbNumericOperation,
	type SbOperation,
} from "../../../types"

import isNotNullish from "@sitebender/fp/lib/predicates/isNotNullish"

const isNumericOperation = (
	operation: SbOperation,
): operation is SbNumericOperation =>
	isNotNullish(operation) &&
	"_tag" in operation &&
	operation._tag === SbOperationTags.numeric

export default isNumericOperation
