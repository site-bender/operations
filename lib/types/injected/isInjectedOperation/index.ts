import {
	InjectableOperation,
	InjectorSource,
	OperationTags,
} from "../../../types"

const isInjectedOperation = (o: any): o is InjectableOperation =>
	typeof o === "object" &&
	o._tag === OperationTags.injector &&
	Object.keys(InjectorSource).includes(o.source)

export default isInjectedOperation
