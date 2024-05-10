import {
	InjectArgument,
	InjectorSource,
	OperationTags,
} from "../../../../types"

const makeInjectedStringArg: InjectArgument<"string"> = {
	operation: "string",
	source: InjectorSource.argument,
	_tag: OperationTags.injector,
}

export default makeInjectedStringArg
