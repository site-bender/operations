import {
	SbAllowedNumericOperands,
	SbConditionalOperations,
	SbLessThan,
	SbOperationTags,
} from "../../../../types"

const makeLessThan = (o: {
	operand: SbAllowedNumericOperands
	test: SbAllowedNumericOperands
}): SbLessThan => ({
	operation: SbConditionalOperations.lessThan,
	_tag: SbOperationTags.conditional,
	operand: o.operand,
	test: o.test,
})

export default makeLessThan
