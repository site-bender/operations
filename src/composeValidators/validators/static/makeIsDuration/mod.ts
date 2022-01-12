import { Temporal } from "https://cdn.skypack.dev/@js-temporal/polyfill?dts"
import type {
	DurationTypeConstraint,
	Validation,
} from "../../../../types/constraints.ts"
import type { DurationOptions } from "../../../../types/values.ts"
import getDuration from "../../../utilities/getDuration/mod.ts"
import makeError from "../../../utilities/makeError/mod.ts"

export default function makeIsDuration(
	constraint: DurationTypeConstraint,
): (validation: Validation) => Validation {
	return function isDuration(validation: Validation): Validation {
		const { value } = validation

		try {
			getDuration(value as Temporal.Duration | DurationOptions | string)

			return validation
		} catch (e) {
			return makeError(validation, constraint, (e as Error).toString())
		}
	}
}
