import {
	AllowedNumericOperands,
	ConditionalOperations,
	NoMoreThan,
	OperationTags,
} from "../../../../types"

const makeNoMoreThan = (o: {
	operand: AllowedNumericOperands
	test: AllowedNumericOperands
}): NoMoreThan => ({
	operation: ConditionalOperations.noMoreThan,
	_tag: OperationTags.conditional,
	operand: o.operand,
	test: o.test,
})

export default makeNoMoreThan
