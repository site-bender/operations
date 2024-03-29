import { right } from "../../fp/either"

import composeOperations from "../../composeOperations"

const getOperands =
	<T>(operands: Array<T | Operation>) =>
	(type: string) =>
		operands.map(operand =>
			typeof operand === type
				? right(operand)
				: composeOperations(operand as Operation)(),
		)

export default getOperands
