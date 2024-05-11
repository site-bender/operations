import { InjectConstant } from "../../../../types"

const makeInjectedNumber = (value: number): InjectConstant<"number"> => ({
	operation: "number",
	source: "constant",
	value,
	_tag: "injector-operation",
})

export default makeInjectedNumber
