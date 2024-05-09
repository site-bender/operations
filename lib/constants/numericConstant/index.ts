import { type NumericConstant } from "../../types"

const makeNumericConstant = (value: number): NumericConstant => ({
	_tag: "numeric-operation",
	operation: "constant",
	value,
})

export default makeNumericConstant
