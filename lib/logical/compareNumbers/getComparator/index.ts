import equalTo from "../../equalTo"
import invalidOperation from "../../invalidOperator"
import lessThan from "../../lessThan"
import moreThan from "../../moreThan"
import noLessThan from "../../noLessThan"
import noMoreThan from "../../noMoreThan"
import unequalTo from "../../unequalTo"

type GetComparatorF = (
	operation: string,
) => (x: number) => (y: number) => boolean | void

const getComparator: GetComparatorF = operation => {
	switch (operation) {
		case "equalTo":
			return equalTo
		case "lessThan":
			return lessThan
		case "moreThan":
			return moreThan
		case "noLessThan":
			return noLessThan
		case "noMoreThan":
			return noMoreThan
		case "unequalTo":
			return unequalTo
		default:
			return invalidOperation
	}
}

export default getComparator
