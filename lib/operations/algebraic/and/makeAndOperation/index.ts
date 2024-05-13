import {
	AlgebraicOperations,
	AndOperation,
	Operation,
	OperationTags,
} from "../../../../types"

const makeAndOperation = (operands: Array<Operation>): AndOperation => ({
	operation: AlgebraicOperations.and,
	_tag: OperationTags.algebraic,
	operands,
})

export default makeAndOperation
