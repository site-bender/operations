import {
	ConditionalOperation,
	ConditionalOperations,
	OperationTags,
} from "../../../types"

const isConditionalOperation = (o: any): o is ConditionalOperation =>
	typeof o === "object" &&
	o._tag === OperationTags.conditional &&
	Object.keys(ConditionalOperations).includes(o.operation)

export default isConditionalOperation
