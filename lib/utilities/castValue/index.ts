import type { SbCastableValue, Reify } from "../../types"

import isBoolean from "./isBoolean"
import { Either, left, right } from "@sitebender/fp/lib/either"

export type CastValue = <T extends SbCastableValue>(
	type: T,
) => (value: any) => Either<string[], Reify<T>>

const castValue: CastValue = type => value => {
	switch (type) {
		case "integer":
			try {
				const parsed = parseInt(value)
				return Number.isNaN(parsed)
					? left([`Failed to parse ${value} to an integer`])
					: right(parsed)
			} catch (e) {
				return left([`Failed to parse ${value} to an integer : ${String(e)}`])
			}
		case "number":
			try {
				const parsed = Number(value)
				return Number.isNaN(parsed)
					? left([`Failed to parse ${value} to a number`])
					: right(parsed)
			} catch (e) {
				return left([`Failed to parse ${value} to a number : ${String(e)}`])
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
