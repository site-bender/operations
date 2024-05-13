import {
	SbCastableValue,
	SbInjectConstant,
	SbInjectorSource,
	SbOperationTags,
} from "../../../types"

const isInjectedConstant = (o: any): o is SbInjectConstant<SbCastableValue> =>
	typeof o === "object" &&
	o._tag === SbOperationTags.injector &&
	o.source === SbInjectorSource.constant

export default isInjectedConstant
