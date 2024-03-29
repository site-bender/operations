import { map } from "../../fp/either"

const castValue = (type: string) => (value: Either<Array<string>, string>) => {
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
