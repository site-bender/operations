export interface OperationBase {
	operation: string
	returns: string
}

export interface NumericalBase extends OperationBase {
	precision?: number | undefined
	truncation?: "ceiling" | "floor" | "round" | "truncate" | undefined
}

export interface AddOperation extends NumericalBase {
	addends: Array<number | NumericOperation>
	operation: "add"
	returns: "number"
}

export interface AndOperation extends OperationBase {
	operands: Array<Operation>
	operation: "and"
	returns: "boolean"
}

export interface DivideOperation extends NumericalBase {
	dividend: number | NumericOperation
	divisor: number | NumericOperation
	operation: "divide"
	returns: "number"
}

export interface MultiplyOperation extends NumericalBase {
	multipliers: Array<number | NumericOperation>
	operation: "multiply"
	returns: "number"
}

export interface NegateOperation extends NumericalBase {
	operand: number | NumericOperation
	operation: "negate"
	returns: "number"
}

export interface OrOperation extends OperationBase {
	operands: Array<Operation>
	operation: "or"
	returns: "boolean"
}

export interface PowerOperation extends NumericalBase {
	base: number | NumericOperation
	exponent: number | NumericOperation
	operation: "power"
	returns: "number"
}

export interface RootOperation extends NumericalBase {
	index: number | NumericOperation
	operation: "root"
	radicand: number | NumericOperation
	returns: "number"
}

export interface SubtractOperation extends NumericalBase {
	minuend: number | NumericOperation
	operation: "subtract"
	returns: "number"
	subtrahend: number | NumericOperation
}

export interface NumericComparisonBase extends OperationBase {
	operand: number | NumericOperation
	returns: "boolean"
	test: number | NumericOperation
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

export type CastableValues = "integer" | "number" | "string" | "boolean"

export interface LiteralLookupOperation extends OperationBase {
	operation: "literalLookup"
	operand: InjectableOperation
	test: { [key: string]: Reify<LiteralLookupOperation["operand"]["returns"]> }
}

export interface TableLookupEntry<T extends CastableValues> {
	operation: "tableValue"
	operands: LogicalNumericOperation
	returns: T
	value: Reify<T>
}

export interface TableLookupOperation extends OperationBase {
	operation: "tableLookup"
	operand: InjectableOperation
	test: Array<TableLookupEntry<"number">>
}

export interface InjectValueOperation extends OperationBase {
	returns: CastableValues
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

export type LookupOperation = LiteralLookupOperation | TableLookupOperation

export type Operation =
	| NumericOperation
	| LogicalNumericOperation
	| BooleanOperation
	| InjectableOperation
	| LookupOperation

export type Reify<T extends CastableValues> = T extends "integer" | "number"
	? number
	: T extends "string"
		? string
		: T extends "boolean"
			? boolean
			: never
