import { InjectConstant } from "../../../../types"

const makeInjectedString = (value: string): InjectConstant<"string"> => ({
	operation: "string",
	source: "constant",
	value,
	_tag: "injector-operation",
})

export default makeInjectedString
