import {
	SbAllowedNumericOperands,
	SbConditionalOperations,
	SbNoMoreThan,
	SbOperationTags,
} from "../../../../types"

const makeNoMoreThan = (o: {
	operand: SbAllowedNumericOperands
	test: SbAllowedNumericOperands
}): SbNoMoreThan => ({
	operation: SbConditionalOperations.noMoreThan,
	_tag: SbOperationTags.conditional,
	operand: o.operand,
	test: o.test,
})

export default makeNoMoreThan
