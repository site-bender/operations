import type { CastableValue, Reify } from "../../../types"

import isBoolean from "./isBoolean"
import { Either, flatMap, map } from "@sitebender/fp/lib/either"
import { pipe } from "@sitebender/fp/lib/functions"

export type CastValue = <T extends CastableValue>(
	type: T,
) => (value: Either<string[], any>) => Either<string[], Reify<T>>

const castValue: CastValue = type => value => {
	switch (type) {
		case "integer":
			return pipe(value, map(parseInt))
		case "number":
			return pipe(value, map(Number))
		case "string":
			return pipe(value, map(String))
		case "boolean":
			return pipe(value, flatMap(isBoolean))
		default:
			return value
	}
}

export default castValue
