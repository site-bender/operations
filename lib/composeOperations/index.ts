import { left } from "../fp/either"

import add from "../mathematical/add"
import and from "../booleans/and"
import compareNumbers from "../logical/compareNumbers"
import divide from "../mathematical/divide"
import fromFormInput from "../injectors/formInput"
import multiply from "../mathematical/multiply"
import negate from "../mathematical/negate"
import or from "../booleans/or"
import power from "../mathematical/power"
import root from "../mathematical/root"
import subtract from "../mathematical/subtract"

const composeOperations = <T>(
	op: Operation,
): (() => Either<Array<string>, T>) => {
	switch (op.operation) {
		case "add":
			return add(op as AddOperation) as () => Either<Array<string>, T>
		case "and":
			return and(op as AndOperation) as () => Either<Array<string>, T>
		case "formInput":
			return fromFormInput(op as FormInputOperation) as () => Either<
				Array<string>,
				T
			>
		case "multiply":
			return multiply(op as MultiplyOperation) as () => Either<Array<string>, T>
		case "subtract":
			return subtract(op as SubtractOperation) as () => Either<Array<string>, T>
		case "divide":
			return divide(op as DivideOperation) as () => Either<Array<string>, T>
		case "or":
			return or(op as OrOperation) as () => Either<Array<string>, T>
		case "power":
			return power(op as PowerOperation) as () => Either<Array<string>, T>
		case "root":
			return root(op as RootOperation) as () => Either<Array<string>, T>
		case "negate":
			return negate(op as NegateOperation) as () => Either<Array<string>, T>
		case "equalTo":
		case "greaterThan":
		case "lessThan":
		case "noLessThan":
		case "noMoreThan":
		case "unequalTo":
			return compareNumbers(op as LogicalNumericalOperation) as () => Either<
				Array<string>,
				T
			>
		default:
			return () => left([`Unknown operation.`])
	}
}

export default composeOperations
