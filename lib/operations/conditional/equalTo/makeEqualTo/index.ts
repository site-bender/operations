import {
	SbAllowedNumericOperands,
	SbConditionalOperations,
	SbEqualTo,
	SbOperationTags,
} from "../../../../types"

const makeEqualTo = (o: {
	operand: SbAllowedNumericOperands
	test: SbAllowedNumericOperands
}): SbEqualTo => ({
	operation: SbConditionalOperations.equalTo,
	_tag: SbOperationTags.conditional,
	operand: o.operand,
	test: o.test,
})

export default makeEqualTo
