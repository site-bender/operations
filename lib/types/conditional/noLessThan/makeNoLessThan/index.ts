import {
	AllowedNumericOperands,
	ConditionalOperations,
	NoLessThan,
	OperationTags,
} from "../../../../types"

const makeNoLessThan = (o: {
	operand: AllowedNumericOperands
	test: AllowedNumericOperands
}): NoLessThan => ({
	operation: ConditionalOperations.noLessThan,
	_tag: OperationTags.conditional,
	operand: o.operand,
	test: o.test,
})

export default makeNoLessThan
