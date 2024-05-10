import type { CastableValue, Reify } from "../../../types"

import isBoolean from "./isBoolean"
import { Either, left, right } from "@sitebender/fp/lib/either"

export type CastValue = <T extends CastableValue>(
	type: T,
) => (value: any) => Either<string[], Reify<T>>

const castValue: CastValue = type => value => {
	switch (type) {
		case "integer":
			try {
				const parsed = parseInt(value)
				return Number.isNaN(parsed)
					? left([`Failed to parse ${value} to integer`])
					: right(parsed)
			} catch (e) {
				return left([`Failed to parse ${value} to integer : ${String(e)}`])
			}
		case "number":
			try {
				const parsed = Number(value)
				return Number.isNaN(parsed)
					? left([`Failed to parse ${value} to number`])
					: right(parsed)
			} catch (e) {
				return left([`Failed to parse ${value} to number : ${String(e)}`])
			}
		case "string":
			return right(String(value))
		case "boolean":
			return isBoolean(value)
		default:
			return value
	}
}

export default castValue
