import {
	AllowedNumericOperands,
	ConditionalOperations,
	LessThan,
	OperationTags,
} from "../../../../types"

const makeLessThan = (o: {
	operand: AllowedNumericOperands
	test: AllowedNumericOperands
}): LessThan => ({
	operation: ConditionalOperations.lessThan,
	_tag: OperationTags.conditional,
	operand: o.operand,
	test: o.test,
})

export default makeLessThan
