import { ADDITION_IDENTITY } from "../../../constants"
import pipe from "../../../fp/functions/pipe"
import reduce from "../../reduce"

type SUM = (self: Array<number>) => number

const sum: SUM = pipe(
	ADDITION_IDENTITY,
	reduce((a, b: number) => a + b),
)

export default sum
