import {
	SbInjectFromForm,
	SbInjectorSource,
	SbOperationTags,
} from "../../../../types"

const isInjectedNumberFromForm = (o: any): o is SbInjectFromForm<"number"> =>
	typeof o === "object" &&
	o._tag === SbOperationTags.injector &&
	o.source === SbInjectorSource.form

export default isInjectedNumberFromForm
