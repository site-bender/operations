import { SbOperationTags, SbTernaryOperation } from "../../../types"

const isTernaryOperation = (o: any): o is SbTernaryOperation =>
	typeof o === "object" && o._tag === SbOperationTags.ternary

export default isTernaryOperation
