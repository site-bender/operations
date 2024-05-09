export type ElementOf<T extends readonly unknown[]> =
	T extends readonly (infer ET)[] ? ET : never

interface NumericBase {
	_tag: "numeric-operation"
	precision?: NumericConstant
}

export interface NumericConstant extends NumericBase {
	operation: "constant"
	value: number
}

export interface AddOperation extends NumericBase {
	addends: Array<InjectFromArgumentOperation | NumericOperation>
	operation: "add"
}

export interface DivideOperation extends NumericBase {
	dividend: InjectFromArgumentOperation | NumericOperation
	divisor: InjectFromArgumentOperation | NumericOperation
	operation: "divide"
}

export interface MultiplyOperation extends NumericBase {
	multipliers: Array<InjectFromArgumentOperation | NumericOperation>
	operation: "multiply"
}

export interface NegateOperation extends NumericBase {
	operand: InjectFromArgumentOperation | NumericOperation
	operation: "negate"
}

export interface PowerOperation extends NumericBase {
	base: InjectFromArgumentOperation | NumericOperation
	exponent: InjectFromArgumentOperation | NumericOperation
	operation: "power"
}

export interface RootOperation extends NumericBase {
	index: InjectFromArgumentOperation | NumericOperation
	operation: "root"
	radicand: InjectFromArgumentOperation | NumericOperation
}

export interface SubtractOperation extends NumericBase {
	minuend: InjectFromArgumentOperation | NumericOperation
	operation: "subtract"
	subtrahend: InjectFromArgumentOperation | NumericOperation
}

export interface TruncateOperation extends NumericBase {
	operation: "truncate"
	method: "round" | "ceiling" | "floor" | "truncate"
	precision?: NumericConstant
	operand: NumericOperation
}

export type NumericOperation =
	| NumericConstant
	| AddOperation
	| DivideOperation
	| MultiplyOperation
	| NegateOperation
	| PowerOperation
	| RootOperation
	| SubtractOperation
	| TruncateOperation

//=======================================================================

export interface InjectFromArgumentOperation {
	readonly operation: "injectFromArgument"
}

export interface OperationBase {
	operation: string
	returns: string
}

export interface AndOperation extends OperationBase {
	operands: Array<Operation>
	operation: "and"
	returns: "boolean"
}

export interface OrOperation extends OperationBase {
	operands: Array<Operation>
	operation: "or"
	returns: "boolean"
}

export interface NumericComparisonBase extends OperationBase {
	operand: NumericConstant | InjectFromArgumentOperation | NumericOperation
	returns: "boolean"
	test: NumericConstant | InjectFromArgumentOperation | NumericOperation
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

export interface InjectFromMapOperation extends OperationBase {
	operation: "injectFromMap"
	operand: InjectFromArgumentOperation | InjectableOperation
	test: { [key: string]: Reify<CastableValue> }
}

export interface TableLookupEntry<T extends CastableValue> {
	operation: "tableValue"
	operands: LogicalNumericOperation
	returns: T
	value: Reify<T>
}

export interface InjectFromLookupTableOperation extends OperationBase {
	operation: "injectFromLookupTable"
	operand: InjectFromArgumentOperation | InjectableOperation
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

export type LookupOperation =
	| InjectFromMapOperation
	| InjectFromLookupTableOperation

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
