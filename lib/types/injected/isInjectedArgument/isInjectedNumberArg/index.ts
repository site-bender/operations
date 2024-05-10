import {
	InjectArgument,
	InjectorSource,
	OperationTags,
} from "../../../../types"

const isInjectedNumberArg = (o: any): o is InjectArgument<"number"> =>
	typeof o === "object" &&
	o._tag === OperationTags.injector &&
	o.source === InjectorSource.argument &&
	o.operation === "number"

export default isInjectedNumberArg
