import {
	SbAllowedNumericOperands,
	SbConditionalOperations,
	SbUnequalTo,
	SbOperationTags,
} from "../../../../types"

const makeUnequalTo = (o: {
	operand: SbAllowedNumericOperands
	test: SbAllowedNumericOperands
}): SbUnequalTo => ({
	operation: SbConditionalOperations.unequalTo,
	_tag: SbOperationTags.conditional,
	operand: o.operand,
	test: o.test,
})

export default makeUnequalTo
