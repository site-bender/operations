import add from "../../../mathematical/add"
import compareNumbers from "../../../logical/compareNumbers"
import divide from "../../../mathematical/divide"
import multiply from "../../../mathematical/multiply"
import negate from "../../../mathematical/negate"
import power from "../../../mathematical/power"
import root from "../../../mathematical/root"
import subtract from "../../../mathematical/subtract"
import { left } from "../../../fp/either"

type EvaluateNumericOperations = (
	o: NumericOperation,
) => () => Either<Array<string>, number>
const evaluateNumericOperations: EvaluateNumericOperations = op => {
	switch (op.operation) {
		case "add":
			return add(op)
		case "divide":
			return divide(op)
		case "multiply":
			return multiply(op)
		case "negate":
			return negate(op)
		case "power":
			return power(op)
		case "root":
			return root(op)
		case "subtract":
			return subtract(op)
		case "equalTo":
		case "greaterThan":
		case "lessThan":
		case "noLessThan":
		case "noMoreThan":
		case "unequalTo":
			return compareNumbers(op)
		default:
			return () => left([`Invalid numeric operation ${op}`])
	}
}

export default evaluateNumericOperations
