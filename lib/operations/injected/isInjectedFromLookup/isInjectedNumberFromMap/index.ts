import {
	SbInjectFromMap,
	SbInjectorType,
	SbOperationTags,
} from "../../../../types"

const isInjectedNumberFromMap = (o: any): o is SbInjectFromMap<"number"> =>
	typeof o === "object" &&
	o._tag === SbOperationTags.injector &&
	o.type === SbInjectorType.map &&
	o.injectedDataType === "number"

export default isInjectedNumberFromMap
