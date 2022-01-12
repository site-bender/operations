import { Temporal } from "@js-temporal/polyfill"
import type {
	InstantTypeConstraint,
	Validation,
} from "../../../../types/constraints.js"
import getInstant from "../../../utilities/getInstant/mod.js"
import makeError from "../../../utilities/makeError/mod.js"

// FIXME
export default function makeIsInstant(
	constraint: InstantTypeConstraint,
): (validation: Validation) => Validation {
	return function isInstant(validation: Validation): Validation {
		const value = validation.value

		try {
			getInstant(value as Temporal.Instant | Date | string)

			return validation
		} catch (e) {
			return makeError(validation, constraint, (e as Error).toString())
		}
	}
}
