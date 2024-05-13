import {
	SbAlgebraicOperations,
	SbOrOperation,
	SbOperation,
	SbOperationTags,
} from "../../../../types"

const makeOrOperation = (operands: Array<SbOperation>): SbOrOperation => ({
	operation: SbAlgebraicOperations.or,
	_tag: SbOperationTags.algebraic,
	operands,
})

export default makeOrOperation
