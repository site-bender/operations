import { OperationTags, type NumericConstant } from "../../types"

const makeNumericConstant = (value: number): NumericConstant => ({
	_tag: OperationTags.numeric,
	operation: "constant",
	value,
})

export default makeNumericConstant
