export type ElementOf<T extends readonly unknown[]> =
	T extends readonly (infer ET)[] ? ET : never

export interface FromParamOperation {
	readonly operation: "getFromArgument"
}

export interface OperationBase {
	operation: string
	returns: string
}

export interface NumericalBase extends OperationBase {
	precision?: number | undefined
	truncation?: "ceiling" | "floor" | "round" | "truncate" | undefined
}

export interface AddOperation extends NumericalBase {
	addends: Array<number | FromParamOperation | NumericOperation>
	operation: "add"
	returns: "number"
}

export interface AndOperation extends OperationBase {
	operands: Array<Operation>
	operation: "and"
	returns: "boolean"
}

export interface DivideOperation extends NumericalBase {
	dividend: number | FromParamOperation | NumericOperation
	divisor: number | FromParamOperation | NumericOperation
	operation: "divide"
	returns: "number"
}

export interface MultiplyOperation extends NumericalBase {
	multipliers: Array<number | FromParamOperation | NumericOperation>
	operation: "multiply"
	returns: "number"
}

export interface NegateOperation extends NumericalBase {
	operand: number | FromParamOperation | NumericOperation
	operation: "negate"
	returns: "number"
}

export interface OrOperation extends OperationBase {
	operands: Array<Operation>
	operation: "or"
	returns: "boolean"
}

export interface PowerOperation extends NumericalBase {
	base: number | FromParamOperation | NumericOperation
	exponent: number | FromParamOperation | NumericOperation
	operation: "power"
	returns: "number"
}

export interface RootOperation extends NumericalBase {
	index: number | FromParamOperation | NumericOperation
	operation: "root"
	radicand: number | FromParamOperation | NumericOperation
	returns: "number"
}

export interface SubtractOperation extends NumericalBase {
	minuend: number | FromParamOperation | NumericOperation
	operation: "subtract"
	returns: "number"
	subtrahend: number | FromParamOperation | NumericOperation
}

export interface NumericComparisonBase extends OperationBase {
	operand: number | FromParamOperation | NumericOperation
	returns: "boolean"
	test: number | FromParamOperation | NumericOperation
}

export interface UnequalToOperation extends NumericComparisonBase {
	operation: "unequalTo"
}

export interface EqualToOperation extends NumericComparisonBase {
	operation: "equalTo"
}

export interface LessThanOperation extends NumericComparisonBase {
	operation: "lessThan"
}

export interface MoreThanOperation extends NumericComparisonBase {
	operation: "moreThan"
}

export interface NoLessThanOperation extends NumericComparisonBase {
	operation: "noLessThan"
}

export interface NoMoreThanOperation extends NumericComparisonBase {
	operation: "noMoreThan"
}

export const CastableValues = [
	"integer",
	"number",
	"string",
	"boolean",
] as const

export type CastableValue = ElementOf<typeof CastableValues>

export interface GetFromMapOperation extends OperationBase {
	operation: "getFromMap"
	operand: FromParamOperation | InjectableOperation
	test: { [key: string]: Reify<CastableValue> }
}

export interface TableLookupEntry<T extends CastableValue> {
	operation: "tableValue"
	operands: LogicalNumericOperation
	returns: T
	value: Reify<T>
}

export interface GetFromLookupTableOperation extends OperationBase {
	operation: "getFromLookupTable"
	operand: FromParamOperation | InjectableOperation
	test: Array<TableLookupEntry<"number">>
}

export interface InjectValueOperation extends OperationBase {
	returns: CastableValue
	eager?: boolean | undefined
	parse?: boolean | undefined
}

export interface FormInputOperation extends InjectValueOperation {
	name: string
	operation: "formInput"
}

export interface LocalStorageOperation extends InjectValueOperation {
	key: string
	operation: "localStorage"
}

export interface SessionStorageOperation extends InjectValueOperation {
	key: string
	operation: "sessionStorage"
}

export type NumericOperation =
	| AddOperation
	| DivideOperation
	| MultiplyOperation
	| NegateOperation
	| PowerOperation
	| RootOperation
	| SubtractOperation

export type LogicalNumericOperation =
	| LessThanOperation
	| NoLessThanOperation
	| MoreThanOperation
	| NoMoreThanOperation
	| EqualToOperation
	| UnequalToOperation

export type BooleanOperation = AndOperation | OrOperation

export type InjectableOperation =
	| FormInputOperation
	| LocalStorageOperation
	| SessionStorageOperation

export type LookupOperation = GetFromMapOperation | GetFromLookupTableOperation

export type Operation =
	| NumericOperation
	| LogicalNumericOperation
	| BooleanOperation
	| InjectableOperation
	| LookupOperation

export type Reify<T extends CastableValue> = T extends "integer" | "number"
	? number
	: T extends "string"
		? string
		: T extends "boolean"
			? boolean
			: never
