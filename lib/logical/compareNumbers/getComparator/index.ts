import { Either, left, right } from "@sitebender/fp/lib/either"
import equalTo from "../../equalTo"
import lessThan from "../../lessThan"
import moreThan from "../../moreThan"
import noLessThan from "../../noLessThan"
import noMoreThan from "../../noMoreThan"
import unequalTo from "../../unequalTo"

type GetComparatorF = (
	operation: string,
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
