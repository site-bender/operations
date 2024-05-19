import {
	SbInjectConstant,
	SbInjectFromMap,
	SbInjectableOperationOfType,
	SbInjectorType,
	SbOperationTags,
} from "../../../../types"

const injectedNumberFromMap = (o: {
	column: SbInjectConstant<"number">
	operand: SbInjectableOperationOfType<"string">
	test: { [key: string]: Array<number> }
}): SbInjectFromMap<"number"> => ({
	injectedDataType: "number",
	type: SbInjectorType.map,
	_tag: SbOperationTags.injector,
	operand: o.operand,
	test: o.test,
	column: o.column,
})

export default injectedNumberFromMap
