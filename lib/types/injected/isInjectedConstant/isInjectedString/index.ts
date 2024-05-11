import {
	InjectConstant,
	InjectorSource,
	OperationTags,
} from "../../../../types"

const isInjectedString = (o: any): o is InjectConstant<"string"> =>
	typeof o === "object" &&
	o._tag === OperationTags.injector &&
	o.source === InjectorSource.constant &&
	typeof o.value === "string"

export default isInjectedString
