import {
	NumericConstant,
	NumericOperations,
	OperationTags,
} from "../../../types"

const isNumericConstant = (c: any): c is NumericConstant =>
	"_tag" in c &&
	c._tag === OperationTags.numeric &&
	"operation" in c &&
	c.operation === NumericOperations.constant

export default isNumericConstant
