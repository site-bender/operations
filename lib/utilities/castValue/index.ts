import { flatten, map } from "fp-ts/lib/Either"

import isBoolean from "./isBoolean"
import Reify from "../../injectors/reify"

type CastValue = <T extends CastableValues>(
	type: T,
) => (value: Either<string[], any>) => Either<string[], Reify<T>>

const castValue: CastValue = type => value => {
	switch (type) {
		case "integer":
			return map(parseInt)(value)
		case "number":
			return map(Number)(value)
		case "string":
			return map(String)(value)
		case "boolean":
			return flatten(map(isBoolean)(value))
		default:
			return value
	}
}

export default castValue
