import {
	SbInjectArgument,
	SbInjectorType,
	SbOperationTags,
} from "../../../../types"

const makeInjectedBooleanArg: SbInjectArgument<"boolean"> = {
	injectedDataType: "boolean",
	type: SbInjectorType.argument,
	_tag: SbOperationTags.injector,
}

export default makeInjectedBooleanArg
