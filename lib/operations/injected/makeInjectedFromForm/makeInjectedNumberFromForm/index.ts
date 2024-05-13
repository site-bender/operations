import {
	SbInjectFromForm,
	SbInjectorSource,
	SbOperationTags,
} from "../../../../types"

const makeInjectedNumberFromForm = (
	field: string,
): SbInjectFromForm<"number"> => ({
	injectedDataType: "number",
	source: SbInjectorSource.form,
	_tag: SbOperationTags.injector,
	field,
})

export default makeInjectedNumberFromForm
