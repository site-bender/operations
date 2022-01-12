import {
	Validation,
	ZonedDateTimeTypeConstraint,
} from "../../../../types/constraints.js"
import { TypeOfConstraint } from "../../../../types/enums.js"
import { ZonedDateTimeValue } from "../../../../types/values.js"
import makeIsZonedDateTime from "./mod.js"

const constraint: ZonedDateTimeTypeConstraint = {
	constraintType: TypeOfConstraint.IS_ZONED_DATE_TIME,
}

test("[makeIsZonedDateTime] returns correct validation when value is a date", () => {
	const validation: Validation = {
		datatype: "zonedDateTime",
		value: "2000-01-01",
	}

	expect(makeIsZonedDateTime(constraint)(validation)).toEqual(validation)
})

test("[makeIsZonedDateTime] returns error when value is not a date", () => {
	const validation: Validation & ZonedDateTimeValue = {
		datatype: "zonedDateTime",
		// @ts-expect-error override for testing purposes
		value: 666,
	}

	expect(makeIsZonedDateTime(constraint)(validation)).toEqual({
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_ZONED_DATE_TIME,
				constraint,
				errorMessage: "RangeError: invalid ISO 8601 string: 666",
			},
		],
	})
})
