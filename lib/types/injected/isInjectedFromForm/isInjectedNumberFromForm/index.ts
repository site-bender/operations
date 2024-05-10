import {
	InjectFromForm,
	InjectorSource,
	OperationTags,
} from "../../../../types"

const isInjectedNumberFromForm = (o: any): o is InjectFromForm<"number"> =>
	typeof o === "object" &&
	o._tag === OperationTags.injector &&
	o.source === InjectorSource.form

export default isInjectedNumberFromForm
