import {
	AlgebraicOperations,
	OrOperation,
	Operation,
	OperationTags,
} from "../../../../types"

const makeOrOperation = (operands: Array<Operation>): OrOperation => ({
	operation: AlgebraicOperations.or,
	_tag: OperationTags.algebraic,
	operands,
})

export default makeOrOperation
