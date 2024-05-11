import {
	AlgebraicOperations,
	OrOperation,
	OperationTags,
} from "../../../../types"

const isOrOperation = (o: any): o is OrOperation =>
	typeof o === "object" &&
	o._tag === OperationTags.algebraic &&
	o.operation === AlgebraicOperations.or

export default isOrOperation
