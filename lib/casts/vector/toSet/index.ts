import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

export type ToSetF = (
	separator?: string,
) => <T>(
	arg: string | Array<T | string> | Set<T | string>,
) => Option<Set<T | string>>

const toSet: ToSetF =
	(separator = ",") =>
	arg => {
		if (typeof arg === "string") {
			return some(new Set(arg.split(separator)))
		}

		if (arg instanceof Array || arg instanceof Set) {
			return some(new Set(arg))
		}

		return none
	}

export default toSet
