export type ElementOf<T extends readonly unknown[]> =
	T extends readonly (infer ET)[] ? ET : never

export interface NumericConstant {
	_tag: "constant"
	value: number
}

export interface StringConstant {
	_tag: "constant"
	value: string
}

export interface BooleanConstant {
	_tag: "constant"
	value: boolean
}

export type Constant = NumericConstant | BooleanConstant | StringConstant

//=======================================================================

export interface InjectFromArgumentOperation {
	readonly operation: "injectFromArgument"
}

export interface OperationBase {
	operation: string
	returns: string
}

export interface NumericalBase extends OperationBase {
	precision?: NumericConstant | undefined
	truncation?: "ceiling" | "floor" | "round" | "truncate" | undefined
}

export interface AddOperation extends NumericalBase {
	addends: Array<
		NumericConstant | InjectFromArgumentOperation | NumericOperation
	>
	operation: "add"
	returns: "number"
}

export interface AndOperation extends OperationBase {
	operands: Array<Operation>
	operation: "and"
	returns: "boolean"
}

export interface DivideOperation extends NumericalBase {
	dividend: NumericConstant | InjectFromArgumentOperation | NumericOperation
	divisor: NumericConstant | InjectFromArgumentOperation | NumericOperation
	operation: "divide"
	returns: "number"
}

export interface MultiplyOperation extends NumericalBase {
	multipliers: Array<
		NumericConstant | InjectFromArgumentOperation | NumericOperation
	>
	operation: "multiply"
	returns: "number"
}

export interface NegateOperation extends NumericalBase {
	operand: NumericConstant | InjectFromArgumentOperation | NumericOperation
	operation: "negate"
	returns: "number"
}

export interface OrOperation extends OperationBase {
	operands: Array<Operation>
	operation: "or"
	returns: "boolean"
}

export interface PowerOperation extends NumericalBase {
	base: NumericConstant | InjectFromArgumentOperation | NumericOperation
	exponent: NumericConstant | InjectFromArgumentOperation | NumericOperation
	operation: "power"
	returns: "number"
}

export interface RootOperation extends NumericalBase {
	index: NumericConstant | InjectFromArgumentOperation | NumericOperation
	operation: "root"
	radicand: NumericConstant | InjectFromArgumentOperation | NumericOperation
	returns: "number"
}

export interface SubtractOperation extends NumericalBase {
	minuend: NumericConstant | InjectFromArgumentOperation | NumericOperation
	operation: "subtract"
	returns: "number"
	subtrahend: NumericConstant | InjectFromArgumentOperation | NumericOperation
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
