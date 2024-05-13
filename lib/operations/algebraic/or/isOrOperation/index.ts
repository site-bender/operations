import {
	SbAlgebraicOperations,
	SbOrOperation,
	SbOperationTags,
} from "../../../../types"

const isOrOperation = (o: any): o is SbOrOperation =>
	typeof o === "object" &&
	o._tag === SbOperationTags.algebraic &&
	o.operation === SbAlgebraicOperations.or

export default isOrOperation
