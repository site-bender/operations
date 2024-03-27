import type { Left, Right } from "fp-ts/lib/Either"
import { map } from "fp-ts/lib/Either"

type CastValue = <T, U>(
	type: string,
) => (value: Left<string[]> | Right<T>) => Left<string[]> | Right<U>
const castValue: CastValue = type => value => {
	switch (type) {
		case "integer":
			return map(parseInt)(value)
		case "number":
			return map(Number)(value)
		default:
			return value
	}
}

export default castValue
