import castValue from "../../utilities/castValue"
import getValue from "../../utilities/getValue"

type FromFormInput = <T>(
	op: FormInputOperation,
) => () => Either<Array<string>, T>
const fromFormInput: FromFormInput = <T>(op: FormInputOperation) => {
	if (op.eager) {
		const item = castValue(op.returns)(getValue(op.name)())

		return () => item as Either<Array<string>, T>
	}

	return () =>
		castValue(op.returns)(getValue(op.name)()) as Either<Array<string>, T>
}

export default fromFormInput
