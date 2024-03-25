import type { Either } from "fp-ts/lib/Either"
import { left } from "fp-ts/lib/Either"

import add from "../numerical/add"
import and from "../booleans/and"
import compareNumbers from "../logical/compareNumbers"
import divide from "../numerical/divide"
import fromFormInput from "../injectors/formInput"
import multiply from "../numerical/multiply"
import negate from "../numerical/negate"
import or from "../booleans/or"
import power from "../numerical/power"
import root from "../numerical/root"
import subtract from "../numerical/subtract"

type ComposeOperations = (o: Operation) => () => Either<Array<string>, number>
const composeOperations: ComposeOperations = (op: Operation) => {
	switch (op.operation) {
		case "add":
			return add(op as AddOperation)
		case "and":
			return and(op as AndOperation)
		case "formInput":
			return fromFormInput(op as FormInputOperation)
		case "multiply":
			return multiply(op as MultiplyOperation)
		case "subtract":
			return subtract(op as SubtractOperation)
		case "divide":
			return divide(op as DivideOperation)
		case "or":
			return or(op as OrOperation)
		case "power":
			return power(op as PowerOperation)
		case "root":
			return root(op as RootOperation)
		case "negate":
			return negate(op as NegateOperation)
		case "equalTo":
		case "greaterThan":
		case "lessThan":
		case "noLessThan":
		case "noMoreThan":
		case "unequalTo":
			return compareNumbers(op as LogicalNumericalOperation)
		default:
			return () => left([`Unknown operation.`])
	}
}

export default composeOperations
