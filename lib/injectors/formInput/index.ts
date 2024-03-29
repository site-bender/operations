import castValue from "../../utilities/castValue"
import getValue from "../../utilities/getValue"

type FromFormInput = (
	op: FormInputOperation,
) => () => Either<Array<string>, number>
const fromFormInput: FromFormInput = op => {
	if (op.eager) {
		const item = castValue("integer")(getValue(op.name)())
		return () => item
	}

	return () =>
		castValue(op.returns)(getValue(op.name)()) as Either<Array<string>, T>
}

export default fromFormInput
