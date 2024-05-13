import {
	SbFormInjectorData,
	SbInjectFromForm,
	SbInjectorType,
	SbOperationTags,
} from "../../../../types"

const makeInjectedNumberFromForm = (
	source: SbFormInjectorData,
): SbInjectFromForm<"number"> => ({
	injectedDataType: "number",
	type: SbInjectorType.form,
	_tag: SbOperationTags.injector,
	source,
})

export default makeInjectedNumberFromForm
