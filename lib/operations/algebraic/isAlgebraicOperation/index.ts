import {
	SbAlgebraicOperation,
	SbAlgebraicOperations,
	SbOperationTags,
} from "../../../types"

const isAlgebraicOperation = (o: any): o is SbAlgebraicOperation =>
	typeof o === "object" &&
	o._tag === SbOperationTags.algebraic &&
	Object.values(SbAlgebraicOperations).includes(o.operation)

export default isAlgebraicOperation
