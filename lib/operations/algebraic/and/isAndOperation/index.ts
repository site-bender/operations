import {
	SbAlgebraicOperations,
	SbAndOperation,
	SbOperationTags,
} from "../../../../types"

const isAndOperation = (o: any): o is SbAndOperation =>
	typeof o === "object" &&
	o._tag === SbOperationTags.algebraic &&
	o.operation === SbAlgebraicOperations.and

export default isAndOperation
