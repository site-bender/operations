import {
	SbInjectArgument,
	SbInjectorType,
	SbOperationTags,
} from "../../../../types"

const makeInjectedStringArg: SbInjectArgument<"string"> = {
	injectedDataType: "string",
	type: SbInjectorType.argument,
	_tag: SbOperationTags.injector,
}

export default makeInjectedStringArg
