import {
	SbInjectFromLookupTable,
	SbInjectorType,
	SbOperationTags,
} from "../../../../types"

const isInjectedNumberFromLookup = (
	o: any,
): o is SbInjectFromLookupTable<"number"> =>
	typeof o === "object" &&
	o._tag === SbOperationTags.injector &&
	o.type === SbInjectorType.table &&
	o.injectedDataType === "number"

export default isInjectedNumberFromLookup
