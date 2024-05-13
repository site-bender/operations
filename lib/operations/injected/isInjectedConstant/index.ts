import {
	SbCastableValue,
	SbInjectConstant,
	SbInjectorType,
	SbOperationTags,
} from "../../../types"

const isInjectedConstant = (o: any): o is SbInjectConstant<SbCastableValue> =>
	typeof o === "object" &&
	o._tag === SbOperationTags.injector &&
	o.source === SbInjectorType.constant

export default isInjectedConstant
