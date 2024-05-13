import {
	SbInjectArgument,
	SbInjectorSource,
	SbOperationTags,
} from "../../../../types"

const makeInjectedStringArg: SbInjectArgument<"string"> = {
	injectedDataType: "string",
	source: SbInjectorSource.argument,
	_tag: SbOperationTags.injector,
}

export default makeInjectedStringArg
