import {
	SbInjectArgument,
	SbInjectorSource,
	SbOperationTags,
} from "../../../../types"

const injectedNumberArg: SbInjectArgument<"number"> = {
	injectedDataType: "number",
	source: SbInjectorSource.argument,
	_tag: SbOperationTags.injector,
}

export default injectedNumberArg
