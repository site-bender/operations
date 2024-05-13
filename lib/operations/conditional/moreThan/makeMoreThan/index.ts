import {
	SbAllowedNumericOperands,
	SbConditionalOperations,
	SbMoreThan,
	SbOperationTags,
} from "../../../../types"

const makeMoreThan = (o: {
	operand: SbAllowedNumericOperands
	test: SbAllowedNumericOperands
}): SbMoreThan => ({
	operation: SbConditionalOperations.moreThan,
	_tag: SbOperationTags.conditional,
	operand: o.operand,
	test: o.test,
})

export default makeMoreThan
