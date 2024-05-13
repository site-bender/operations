import {
	SbAllowedNumericOperands,
	SbConditionalOperations,
	SbNoLessThan,
	SbOperationTags,
} from "../../../../types"

const makeNoLessThan = (o: {
	operand: SbAllowedNumericOperands
	test: SbAllowedNumericOperands
}): SbNoLessThan => ({
	operation: SbConditionalOperations.noLessThan,
	_tag: SbOperationTags.conditional,
	operand: o.operand,
	test: o.test,
})

export default makeNoLessThan
