import fromFormInput from "../../../injectors/formInput"
import { left } from "../../../fp/either"

type EvaluateUnitOperations = (
	o: UnitOperation,
) => () => Either<Array<string>, number>
const evaluateUnitOperations: EvaluateUnitOperations = op => {
	switch (op.operation) {
		case "formInput":
			return fromFormInput(op)
		default:
			return () => left([`Invalid unit operation ${op}`])
	}
}

export default evaluateUnitOperations
