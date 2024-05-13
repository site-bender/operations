import {
	InjectConstant,
	InjectorSource,
	OperationTags,
} from "../../../../types"

const isInjectedNumber = (o: any): o is InjectConstant<"number"> =>
	typeof o === "object" &&
	o._tag === OperationTags.injector &&
	o.source === InjectorSource.constant &&
	typeof o.value === "number"

export default isInjectedNumber
