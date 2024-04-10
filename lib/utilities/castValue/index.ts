import isBoolean from "./isBoolean"
import Reify from "../../injectors/reify"
import { flatMap, map } from "../../fp/either"
import { pipe } from "../../fp/functions"

type CastValue = <T extends CastableValues>(
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
