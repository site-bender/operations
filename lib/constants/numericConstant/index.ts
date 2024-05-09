import { type NumericConstant as makeNumericConstant } from "../../types"

const makeNumericConstant = (value: number): makeNumericConstant => ({
	_tag: "constant",
	value,
})

export default makeNumericConstant
