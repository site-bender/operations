import {
	SbInjectableOperation,
	SbInjectorType,
	SbOperationTags,
} from "../../../types"

const isInjectedOperation = (o: any): o is SbInjectableOperation =>
	typeof o === "object" &&
	o._tag === SbOperationTags.injector &&
	Object.keys(SbInjectorType).includes(o.type)

export default isInjectedOperation
