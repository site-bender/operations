import {
	CastableValue,
	InjectConstant,
	InjectorSource,
	OperationTags,
} from "../../../types"

const isInjectedConstant = (o: any): o is InjectConstant<CastableValue> =>
	typeof o === "object" &&
	o._tag === OperationTags.injector &&
	o.source === InjectorSource.constant

export default isInjectedConstant
