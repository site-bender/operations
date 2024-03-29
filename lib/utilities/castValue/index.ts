import type { Either } from "fp-ts/lib/Either"
import { map } from "fp-ts/lib/Either"

type Cast = "integer" | "number" | "string" | "boolean"

type Reify<T extends Cast> = T extends "integer" | "number"
	? number
	: T extends "string"
		? string
		: T extends "boolean"
			? boolean
			: never

type CastValue = <T extends Cast>(
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
			return map(Boolean)(value)
		default:
			return value
	}
}

export default castValue
