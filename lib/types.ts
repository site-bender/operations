export type ElementOf<T extends readonly unknown[]> = T[number]

export const OperationTags = {
	constant: "constant-operation",
	numeric: "numeric-operation",
	injector: "injector-operation",
} as const

export const InjectorSource = {
	constant: "constant",
	argument: "argument",
	form: "form",
	session: "session-storage",
	local: "local-storage",
} as const

export const InjectorOperations = {
	number: "inject-number",
	string: "inject-string",
} as const

interface InjectValueBase {
	_tag: typeof OperationTags.injector
	source: keyof typeof InjectorSource
	eager?: boolean
}

export interface InjectConstant<Operation extends CastableValue>
	extends InjectValueBase {
	operation: Operation
	source: typeof InjectorSource.constant
	value: Reify<Operation>
}

export interface InjectArgument<Operation extends CastableValue>
	extends InjectValueBase {
	operation: Operation
	source: typeof InjectorSource.argument
}

export interface InjectNumeric extends InjectValueBase {
	operation: typeof InjectorOperations.number
}

export interface InjectString extends InjectValueBase {
	operation: typeof InjectorOperations.string
}

export type InjectorOperation =
	| InjectConstant<CastableValue>
	| InjectNumeric
	| InjectString

export const NumericOperations = {
	add: "add",
	divide: "divide",
	multiply: "multiply",
	negate: "negate",
	power: "power",
	root: "root",
	subtract: "subtract",
	truncate: "truncate",
} as const

interface NumericBase {
	_tag: typeof OperationTags.numeric
	precision?: InjectConstant<"number">
}

export type AllowedNumericOperands =
	| InjectArgument<"number">
	| InjectConstant<"number">
	| NumericOperation

export interface AddOperation extends NumericBase {
	addends: Array<AllowedNumericOperands>
	operation: typeof NumericOperations.add
}

export interface DivideOperation extends NumericBase {
	dividend: AllowedNumericOperands
	divisor: AllowedNumericOperands
	operation: typeof NumericOperations.divide
}

export interface MultiplyOperation extends NumericBase {
	multipliers: Array<AllowedNumericOperands>
	operation: typeof NumericOperations.multiply
}

export interface NegateOperation extends NumericBase {
	operand: AllowedNumericOperands
	operation: typeof NumericOperations.negate
}

export interface PowerOperation extends NumericBase {
	base: AllowedNumericOperands
	exponent: AllowedNumericOperands
	operation: typeof NumericOperations.power
}

export interface RootOperation extends NumericBase {
	index: AllowedNumericOperands
	operation: typeof NumericOperations.root
	radicand: AllowedNumericOperands
}

export interface SubtractOperation extends NumericBase {
	minuend: AllowedNumericOperands
	operation: typeof NumericOperations.subtract
	subtrahend: AllowedNumericOperands
}

export interface TruncateOperation extends NumericBase {
	operation: typeof NumericOperations.truncate
	method: "round" | "ceiling" | "floor" | "truncate"
	operand: AllowedNumericOperands
}

export type NumericOperation =
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
	operand: InjectFromArgumentOperation | NumericOperation
	returns: "boolean"
	test: InjectFromArgumentOperation | NumericOperation
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
