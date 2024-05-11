import {
	AlgebraicOperations,
	AndOperation,
	OperationTags,
} from "../../../../types"

const isAndOperation = (o: any): o is AndOperation =>
	typeof o === "object" &&
	o._tag === OperationTags.algebraic &&
	o.operation === AlgebraicOperations.and

export default isAndOperation
