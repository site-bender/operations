import { InjectConstant } from "../../../../types"

const makeInjectedString = (value: string): InjectConstant<"string"> => ({
	injectedDataType: "string",
	source: "constant",
	value,
	_tag: "injectorOperation",
})

export default makeInjectedString
