import { MULTIPLICATION_IDENTITY } from "../../../constants"
import pipe from "@sitebender/fp/lib/functions/pipe"
import reduce from "../../reduce"

type MULTIPLY = (self: Array<number>) => number

const multiply: MULTIPLY = pipe(
	MULTIPLICATION_IDENTITY,
	reduce((a, b: number) => a * b),
)

export default multiply
