import {
	InjectArgument,
	InjectorSource,
	OperationTags,
} from "../../../../types"

const injectedNumberArg: InjectArgument<"number"> = {
	injectedDataType: "number",
	source: InjectorSource.argument,
	_tag: OperationTags.injector,
}

export default injectedNumberArg
