import {
	SbAllowedNumericOperands,
	SbConditionalOperation,
	SbOperationTags,
	SbTernaryOperation,
} from "../../../types"

const makeTernaryOperation = (o: {
	condition: SbConditionalOperation
	onTrue: SbAllowedNumericOperands
	onFalse: SbAllowedNumericOperands
}): SbTernaryOperation => ({
	_tag: SbOperationTags.ternary,
	condition: o.condition,
	onTrue: o.onTrue,
	onFalse: o.onFalse,
})

export default makeTernaryOperation
