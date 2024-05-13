import {
	SbInjectConstant,
	SbInjectorSource,
	SbOperationTags,
} from "../../../../types"

const isInjectedNumber = (o: any): o is SbInjectConstant<"number"> =>
	typeof o === "object" &&
	o._tag === SbOperationTags.injector &&
	o.source === SbInjectorSource.constant &&
	typeof o.value === "number"

export default isInjectedNumber
