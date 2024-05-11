import {
	AllowedNumericOperands,
	ConditionalOperations,
	MoreThan,
	OperationTags,
} from "../../../../types"

const makeMoreThan = (o: {
	operand: AllowedNumericOperands
	test: AllowedNumericOperands
}): MoreThan => ({
	operation: ConditionalOperations.moreThan,
	_tag: OperationTags.conditional,
	operand: o.operand,
	test: o.test,
})

export default makeMoreThan
