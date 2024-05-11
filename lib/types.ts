export type ElementOf<T extends readonly unknown[]> = T[number]

export const CastableValues = [
	"integer",
	"number",
	"string",
	"boolean",
] as const

export type CastableValue = ElementOf<typeof CastableValues>

export type Reify<T extends CastableValue> = T extends "integer" | "number"
	? number
	: T extends "string"
		? string
		: T extends "boolean"
			? boolean
			: never

export const OperationTags = {
	numeric: "numeric-operation",
	injector: "injector-operation",
	conditional: "conditional-operation",
	algebraic: "algebraic-operation",
} as const

export const InjectorSource = {
	constant: "constant",
	argument: "argument",
	form: "form",
	session: "session",
	local: "local",
	map: "map",
	table: "table",
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

export interface InjectFromForm<Operation extends CastableValue>
	extends InjectValueBase {
	operation: Operation
	source: typeof InjectorSource.form
	field: string
}

export interface InjectFromSession<Operation extends CastableValue>
	extends InjectValueBase {
	operation: Operation
	source: typeof InjectorSource.session
	key: string
}

export interface InjectFromLocal<Operation extends CastableValue>
	extends InjectValueBase {
	operation: Operation
	source: typeof InjectorSource.local
	key: string
}

export interface InjectFromMap<Operation extends CastableValue>
	extends InjectValueBase {
	operation: Operation
	source: typeof InjectorSource.map
	operand: InjectableOperationOfType<"string">
	test: { [key: string]: Reify<Operation> }
}

export interface TableLookupEntry<T extends CastableValue> {
	operands: ConditionalOperation
	returns: T
	value: Reify<T>
}

export interface InjectFromLookupTable<Operation extends CastableValue>
	extends InjectValueBase {
	operation: Operation
	source: typeof InjectorSource.table
	operand: Exclude<
		InjectableOperationOfType<Operation>,
		InjectFromLookupTable<Operation>
	>
	test: Array<TableLookupEntry<Operation>>
}

export type InjectableOperationOfType<T extends CastableValue> =
	| InjectConstant<T>
	| InjectArgument<T>
	| InjectFromForm<T>
	| InjectFromSession<T>
	| InjectFromLocal<T>
	| InjectFromMap<T>
	| InjectFromLookupTable<T>

export type InjectableOperation =
	| InjectConstant<CastableValue>
	| InjectArgument<CastableValue>
	| InjectFromForm<CastableValue>
	| InjectFromSession<CastableValue>
	| InjectFromLocal<CastableValue>
	| InjectFromMap<CastableValue>
	| InjectFromLookupTable<CastableValue>

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

export const ConditionalOperations = {
	equalTo: "equalTo",
	unequalTo: "unequalTo",
	lessThan: "lessThan",
	noLessThan: "noLessThan",
	moreThan: "moreThan",
	noMoreThan: "noMoreThan",
} as const

interface ConditionalBase {
	_tag: typeof OperationTags.conditional
	operand: AllowedNumericOperands
	test: AllowedNumericOperands
}

export interface EqualTo extends ConditionalBase {
	operation: typeof ConditionalOperations.equalTo
}

export interface UnequalTo extends ConditionalBase {
	operation: typeof ConditionalOperations.unequalTo
}

export interface LessThan extends ConditionalBase {
	operation: typeof ConditionalOperations.lessThan
}

export interface MoreThan extends ConditionalBase {
	operation: typeof ConditionalOperations.moreThan
}

export interface NoLessThan extends ConditionalBase {
	operation: typeof ConditionalOperations.noLessThan
}

export interface NoMoreThan extends ConditionalBase {
	operation: typeof ConditionalOperations.noMoreThan
}

export type ConditionalOperation =
	| EqualTo
	| UnequalTo
	| LessThan
	| MoreThan
	| NoLessThan
	| NoMoreThan

export const AlgebraicOperations = {
	and: "and",
	or: "or",
	xor: "xor",
} as const

interface AlgebraicBase {
	_tag: typeof OperationTags.algebraic
	operands: Array<any>
}

export interface AndOperation extends AlgebraicBase {
	operation: typeof AlgebraicOperations.and
}

export interface OrOperation extends AlgebraicBase {
	operation: typeof AlgebraicOperations.or
}

export type AlgebraicOperation = AndOperation | OrOperation

export type Operation =
	| AlgebraicOperation
	| ConditionalOperation
	| InjectableOperation
	| NumericOperation
