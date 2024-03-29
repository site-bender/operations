const notNullish = <T>(o: T): o is Exclude<T, null | undefined> =>
	o !== null && o != undefined

const isNumericOperation = (o: any): o is NumericOperation =>
	notNullish(o) && o["returns"] === "number"

const isBooleanOperation = (o: any): o is BooleanOperation =>
	notNullish(o) && o["returns"] === "boolean"

const isUnitOperation = (o: any): o is UnitOperation =>
	notNullish(o) && o["returns"] === "unit"

const isFailOperation = (o: any): o is FailOperation =>
	notNullish(o) && o["returns"] === "error"

const isAddOperation = (o: any): o is AddOperation =>
	isNumericOperation(o) && o.operation === "add"

const AddOperation = (
	lhs: number | NumericOperation,
	rhs: number | NumericOperation,
): AddOperation => ({
	addends: [lhs, rhs] as const,
	operation: "add",
	returns: "number",
})

export {
	notNullish,
	isNumericOperation,
	isBooleanOperation,
	isUnitOperation,
	isAddOperation,
	isFailOperation,
	AddOperation,
}
