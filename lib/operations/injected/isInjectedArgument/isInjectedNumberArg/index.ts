import {
	SbInjectArgument,
	SbInjectorType,
	SbOperationTags,
} from "../../../../types"

const isInjectedNumberArg = (o: any): o is SbInjectArgument<"number"> =>
	typeof o === "object" &&
	o._tag === SbOperationTags.injector &&
	o.type === SbInjectorType.argument &&
	o.injectedDataType === "number"

export default isInjectedNumberArg
