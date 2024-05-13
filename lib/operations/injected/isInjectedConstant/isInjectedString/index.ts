import {
	SbInjectConstant,
	SbInjectorType,
	SbOperationTags,
} from "../../../../types"

const isInjectedString = (o: any): o is SbInjectConstant<"string"> =>
	typeof o === "object" &&
	o._tag === SbOperationTags.injector &&
	o.type === SbInjectorType.constant &&
	typeof o.value === "string"

export default isInjectedString
