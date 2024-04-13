import { Either } from "@sitebender/fp/lib/either"
import castValue from "../../utilities/castValue"
import getValue from "../../utilities/getValue"
import Reify from "../reify"

type FromFormInput = (
	op: FormInputOperation,
) => () => Either<Array<string>, Reify<CastableValues>>

const fromFormInput: FromFormInput = op => {
	if (op.eager) {
		const item = castValue(op.returns)(getValue(op.name)())
		return () => item
	}

	return () => castValue(op.returns)(getValue(op.name)())
}

export default fromFormInput
