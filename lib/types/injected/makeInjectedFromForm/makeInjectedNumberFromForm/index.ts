import {
	InjectFromForm,
	InjectorSource,
	OperationTags,
} from "../../../../types"

const makeInjectedNumberFromForm = (
	field: string,
): InjectFromForm<"number"> => ({
	operation: "number",
	source: InjectorSource.form,
	_tag: OperationTags.injector,
	field,
})

export default makeInjectedNumberFromForm
