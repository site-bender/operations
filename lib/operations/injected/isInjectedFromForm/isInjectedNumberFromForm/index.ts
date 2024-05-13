import {
	SbInjectFromForm,
	SbInjectorType,
	SbOperationTags,
} from "../../../../types"

const isInjectedNumberFromForm = (o: any): o is SbInjectFromForm<"number"> =>
	typeof o === "object" &&
	o._tag === SbOperationTags.injector &&
	o.type === SbInjectorType.form

export default isInjectedNumberFromForm
