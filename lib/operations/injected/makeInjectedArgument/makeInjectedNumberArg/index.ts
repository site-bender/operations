import {
	SbInjectArgument,
	SbInjectorType,
	SbOperationTags,
} from "../../../../types"

const injectedNumberArg: SbInjectArgument<"number"> = {
	injectedDataType: "number",
	type: SbInjectorType.argument,
	_tag: SbOperationTags.injector,
}

export default injectedNumberArg
