import { Either, left, right } from "@sitebender/fp/lib/either"
import equalTo from "../../../../makeConditional/operators/number/isEqualTo"
import lessThan from "../../../../makeConditional/operators/number/isLessThan"
import moreThan from "../../../../makeConditional/operators/number/isMoreThan"
import noLessThan from "../../../../makeConditional/operators/number/isAtLeast"
import noMoreThan from "../../../../makeConditional/operators/number/isAtMost"
import unequalTo from "../../../../makeConditional/operators/number/isNotEqualTo"
import { ConditionalOperation } from "../../../../types"

export type GetComparatorF = (
	operation: ConditionalOperation["operation"],
) => Either<string[], (x: number) => (y: number) => boolean>

const getComparator: GetComparatorF = operation => {
	switch (operation) {
		case "equalTo":
			return right(equalTo)
		case "lessThan":
			return right(lessThan)
		case "moreThan":
			return right(moreThan)
		case "noLessThan":
			return right(noLessThan)
		case "noMoreThan":
			return right(noMoreThan)
		case "unequalTo":
			return right(unequalTo)
		default:
			return left([`invalid operation: ${operation}`])
	}
}

export default getComparator
