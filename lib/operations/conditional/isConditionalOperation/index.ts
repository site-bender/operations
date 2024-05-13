import {
	SbConditionalOperation,
	SbConditionalOperations,
	SbOperationTags,
} from "../../../types"

const isConditionalOperation = (o: any): o is SbConditionalOperation =>
	typeof o === "object" &&
	o._tag === SbOperationTags.conditional &&
	Object.keys(SbConditionalOperations).includes(o.operation)

export default isConditionalOperation
