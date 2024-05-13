import {
	SbAlgebraicOperations,
	SbAndOperation,
	SbOperation,
	SbOperationTags,
} from "../../../../types"

const makeAndOperation = (operands: Array<SbOperation>): SbAndOperation => ({
	operation: SbAlgebraicOperations.and,
	_tag: SbOperationTags.algebraic,
	operands,
})

export default makeAndOperation
