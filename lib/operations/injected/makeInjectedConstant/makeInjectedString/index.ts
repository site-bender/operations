import { SbInjectConstant } from "../../../../types"

const makeInjectedString = (value: string): SbInjectConstant<"string"> => ({
	injectedDataType: "string",
	type: "constant",
	value,
	_tag: "injectorOperation",
})

export default makeInjectedString
