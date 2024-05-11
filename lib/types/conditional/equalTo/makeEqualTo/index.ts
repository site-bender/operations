import {
	AllowedNumericOperands,
	ConditionalOperations,
	EqualTo,
	OperationTags,
} from "../../../../types"

const makeEqualTo = (o: {
	operand: AllowedNumericOperands
	test: AllowedNumericOperands
}): EqualTo => ({
	operation: ConditionalOperations.equalTo,
	_tag: OperationTags.conditional,
	operand: o.operand,
	test: o.test,
})

export default makeEqualTo
