import {
	InjectArgument,
	InjectorSource,
	OperationTags,
} from "../../../../types"

const makeInjectedStringArg: InjectArgument<"string"> = {
	injectedDataType: "string",
	source: InjectorSource.argument,
	_tag: OperationTags.injector,
}

export default makeInjectedStringArg
