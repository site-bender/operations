import fromFormInput from "../../../injectors/fromFormInput"
import { left } from "../../../fp/either"
import Reify from "../../../injectors/reify"

type EvaluateInjectableOperation = (
	op: InjectableOperation,
) => () => Either<Array<string>, Reify<CastableValues>>
const evaluateInjectableOperation: EvaluateInjectableOperation = op => {
	switch (op.operation) {
		case "formInput":
			return fromFormInput(op)
		default:
			return () => left([`Invalid unit operation ${op}`])
	}
}

export default evaluateInjectableOperation