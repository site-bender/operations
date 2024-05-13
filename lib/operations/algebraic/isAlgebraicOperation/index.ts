import {
	AlgebraicOperation,
	AlgebraicOperations,
	OperationTags,
} from "../../../types"

const isAlgebraicOperation = (o: any): o is AlgebraicOperation =>
	typeof o === "object" &&
	o._tag === OperationTags.algebraic &&
	Object.values(AlgebraicOperations).includes(o.operation)

export default isAlgebraicOperation
