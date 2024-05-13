import { InjectConstant } from "../../../../types"

const makeInjectedNumber = (value: number): InjectConstant<"number"> => ({
	injectedDataType: "number",
	source: "constant",
	value,
	_tag: "injectorOperation",
})

export default makeInjectedNumber
