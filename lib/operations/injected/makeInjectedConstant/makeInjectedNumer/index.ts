import { SbInjectConstant } from "../../../../types"

const makeInjectedNumber = (value: number): SbInjectConstant<"number"> => ({
	injectedDataType: "number",
	type: "constant",
	value,
	_tag: "injectorOperation",
})

export default makeInjectedNumber
