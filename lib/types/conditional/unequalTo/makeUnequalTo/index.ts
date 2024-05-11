import {
	AllowedNumericOperands,
	ConditionalOperations,
	UnequalTo,
	OperationTags,
} from "../../../../types"

const makeUnequalTo = (o: {
	operand: AllowedNumericOperands
	test: AllowedNumericOperands
}): UnequalTo => ({
	operation: ConditionalOperations.unequalTo,
	_tag: OperationTags.conditional,
	operand: o.operand,
	test: o.test,
})

export default makeUnequalTo
