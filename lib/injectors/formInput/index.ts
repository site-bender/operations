import type { Either } from "fp-ts/lib/Either"

import castValue from "../../utilities/castValue"
import getValue from "../../utilities/getValue"

type FromFormInput = <T>(
	op: FormInputOperation,
) => () => Either<Array<string>, T>
const fromFormInput: FromFormInput = op => {
	if (op.eager) {
		const item = castValue("integer")(getValue(op.name)())

		return () => item
	}

	return () => castValue("integer")(getValue(op.name)())
}

export default fromFormInput
