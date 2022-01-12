import {
	TypeOfBooleanConstraint,
	Validation,
} from "../../../../types/constraints.js"
import { TypeOfConstraint } from "../../../../types/enums.js"
import { BooleanValue } from "../../../../types/values.js"
import makeIsBoolean from "./mod.js"

const constraint: TypeOfBooleanConstraint = {
	constraintType: TypeOfConstraint.IS_BOOLEAN,
}

test("[makeIsBoolean] returns correct validation when value is an boolean", () => {
	const validation: Validation = {
		datatype: "boolean",
		value: true,
	}

	expect(makeIsBoolean(constraint)(validation)).toEqual(validation)
})

test("[makeIsBoolean] returns error when value is not an boolean", () => {
	const validation: Validation & BooleanValue = {
		datatype: "boolean",
		// @ts-expect-error override for testing purposes
		value: undefined,
	}

	expect(makeIsBoolean(constraint)(validation)).toEqual({
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_BOOLEAN,
				constraint,
			},
		],
	})
})
