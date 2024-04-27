import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

export type ToBooleanF = <T>(arg: T) => Option<boolean>

// TODO: is this actually what we want?
const toBoolean: ToBooleanF = arg => {
	if (typeof arg === "string") {
		if (arg.toLocaleLowerCase() === "true" || arg.toLocaleLowerCase() === "t") {
			return some(true)
		}

		if (
			arg.toLocaleLowerCase() === "false" ||
			arg.toLocaleLowerCase() === "f"
		) {
			return some(false)
		}

		return none
	}

	return some(Boolean(arg))
}

export default toBoolean
