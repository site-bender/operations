import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

export type ToArrayF = (
	separator?: string,
) => <T>(arg: string | Array<T | string>) => Option<Array<T | string>>

const toArray: ToArrayF =
	(separator = ",") =>
	arg =>
		typeof arg === "string"
			? some(arg.split(separator))
			: Array.isArray(arg)
				? some(arg)
				: none

export default toArray
