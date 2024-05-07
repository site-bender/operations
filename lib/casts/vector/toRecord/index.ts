import type { Option } from "@sitebender/fp/lib/option"

import none from "@sitebender/fp/lib/option/none"
import some from "@sitebender/fp/lib/option/some"

const isRecord = (record: unknown) =>
	typeof record === "object" &&
	!(
		record == null ||
		record instanceof Array ||
		record instanceof Map ||
		record instanceof Set ||
		record instanceof Date
	)

export type ToRecordF = (
	itemSeparator?: string,
) => (
	keyValueSeparator?: string,
) => <T>(
	arg: string | Record<string, T | string>,
) => Option<Record<string, (T | string) | Array<T | string>>>

const toRecord: ToRecordF =
	(itemSeparator = "&") =>
	(keyValueSeparator = "=") =>
	arg => {
		if (typeof arg == "string") {
			return some(
				arg.split(itemSeparator).reduce(
					(out, pair) => {
						const [key, value] = pair.split(keyValueSeparator)

						const val = out.hasOwnProperty(key)
							? [out[key], value].flat()
							: value

						out[key] = val

						return out
					},
					{} as Record<string, string | Array<string>>,
				),
			)
		}

		return isRecord(arg) ? some(arg) : none
	}

export default toRecord
