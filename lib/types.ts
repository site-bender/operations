export type ElementOf<T extends readonly unknown[]> = T[number]

export const SbCastableValues = [
	"integer",
	"number",
	"string",
	"boolean",
] as const

export type SbCastableValue = ElementOf<typeof SbCastableValues>

export type Reify<T extends SbCastableValue> = T extends "integer" | "number"
	? number
	: T extends "string"
		? string
		: T extends "boolean"
			? boolean
			: never

export const SbOperationTags = {
	numeric: "numericOperation",
	injector: "injectorOperation",
	conditional: "conditionalOperation",
	algebraic: "algebraicOperation",
} as const

export const SbInjectorType = {
	constant: "constant",
	argument: "argument",
	form: "form",
	session: "session",
	local: "local",
	map: "map",
	table: "table",
} as const

interface SbInjectValueBase {
	_tag: typeof SbOperationTags.injector
	type: keyof typeof SbInjectorType
	eager?: boolean
}

export interface SbInjectConstant<Type extends SbCastableValue>
	extends SbInjectValueBase {
	injectedDataType: Type
	type: typeof SbInjectorType.constant
	value: Reify<Type>
}

export interface SbInjectArgument<Type extends SbCastableValue>
	extends SbInjectValueBase {
	injectedDataType: Type
	type: typeof SbInjectorType.argument
}

export interface SbFormInjectorData {
	form?: string
	id?: string
	name: string
	selector?: string
	tagName: string
}

export interface SbInjectFromForm<Type extends SbCastableValue>
	extends SbInjectValueBase {
	injectedDataType: Type
	type: typeof SbInjectorType.form
	source: SbFormInjectorData
}

export interface SbInjectFromSession<Type extends SbCastableValue>
	extends SbInjectValueBase {
	injectedDataType: Type
	type: typeof SbInjectorType.session
	key: string
}

export interface SbInjectFromLocal<Type extends SbCastableValue>
	extends SbInjectValueBase {
	injectedDataType: Type
	type: typeof SbInjectorType.local
	key: string
}

export interface SbInjectFromMap<Type extends SbCastableValue>
	extends SbInjectValueBase {
	injectedDataType: Type
	type: typeof SbInjectorType.map
	operand: SbInjectableOperationOfType<"string">
	test: { [key: string]: Reify<Type> }
}

export interface SbTableLookupEntry<T extends SbCastableValue> {
	operands: SbConditionalOperation
	returns: T
	value: Reify<T>
}

export interface SbInjectFromLookupTable<Operation extends SbCastableValue>
	extends SbInjectValueBase {
	operation: Operation
	type: typeof SbInjectorType.table
	operand: Exclude<
		SbInjectableOperationOfType<Operation>,
		SbInjectFromLookupTable<Operation>
	>
	test: Array<SbTableLookupEntry<Operation>>
}

export type SbInjectableOperationOfType<T extends SbCastableValue> =
	| SbInjectConstant<T>
	| SbInjectArgument<T>
	| SbInjectFromForm<T>
	| SbInjectFromSession<T>
	| SbInjectFromLocal<T>
	| SbInjectFromMap<T>
	| SbInjectFromLookupTable<T>

export type SbInjectableOperation =
	| SbInjectConstant<SbCastableValue>
	| SbInjectArgument<SbCastableValue>
	| SbInjectFromForm<SbCastableValue>
	| SbInjectFromSession<SbCastableValue>
	| SbInjectFromLocal<SbCastableValue>
	| SbInjectFromMap<SbCastableValue>
	| SbInjectFromLookupTable<SbCastableValue>

export const SbNumericOperations = {
	add: "add",
	ceiling: "ceiling",
	divide: "divide",
	floor: "floor",
	multiply: "multiply",
	negate: "negate",
	power: "power",
	root: "root",
	round: "round",
	subtract: "subtract",
	truncate: "truncate",
} as const

interface SbNumericBase {
	_tag: typeof SbOperationTags.numeric
	precision?: SbInjectConstant<"number">
}

export type SbAllowedNumericOperands =
	| SbInjectArgument<"number">
	| SbInjectConstant<"number">
	| SbInjectFromForm<"number">
	| SbNumericOperation

export interface SbAddOperation extends SbNumericBase {
	addends: Array<SbAllowedNumericOperands>
	operation: typeof SbNumericOperations.add
}

export interface SbCeilingOperation extends SbNumericBase {
	operand: SbAllowedNumericOperands
	operation: typeof SbNumericOperations.ceiling
}

export interface SbDivideOperation extends SbNumericBase {
	dividend: SbAllowedNumericOperands
	divisor: SbAllowedNumericOperands
	operation: typeof SbNumericOperations.divide
}

export interface SbFloorOperation extends SbNumericBase {
	operand: SbAllowedNumericOperands
	operation: typeof SbNumericOperations.floor
}

export interface SbMultiplyOperation extends SbNumericBase {
	multipliers: Array<SbAllowedNumericOperands>
	operation: typeof SbNumericOperations.multiply
}

export interface SbNegateOperation extends SbNumericBase {
	operand: SbAllowedNumericOperands
	operation: typeof SbNumericOperations.negate
}

export interface SbPowerOperation extends SbNumericBase {
	base: SbAllowedNumericOperands
	exponent: SbAllowedNumericOperands
	operation: typeof SbNumericOperations.power
}

export interface SbRootOperation extends SbNumericBase {
	index: SbAllowedNumericOperands
	operation: typeof SbNumericOperations.root
	radicand: SbAllowedNumericOperands
}

export interface SbRoundOperation extends SbNumericBase {
	decimalPlaces?: number
	operand: SbAllowedNumericOperands
	operation: typeof SbNumericOperations.round
}

export interface SbSubtractOperation extends SbNumericBase {
	minuend: SbAllowedNumericOperands
	operation: typeof SbNumericOperations.subtract
	subtrahend: SbAllowedNumericOperands
}

export interface SbTruncateOperation extends SbNumericBase {
	decimalPlaces?: number
	operation: typeof SbNumericOperations.truncate
	method: "round" | "ceiling" | "floor" | "truncate"
	operand: SbAllowedNumericOperands
}

export type SbNumericOperation =
	| SbAddOperation
	| SbCeilingOperation
	| SbDivideOperation
	| SbFloorOperation
	| SbMultiplyOperation
	| SbNegateOperation
	| SbPowerOperation
	| SbRootOperation
	| SbRoundOperation
	| SbSubtractOperation
	| SbTruncateOperation

export const SbConditionalOperations = {
	equalTo: "equalTo",
	unequalTo: "unequalTo",
	lessThan: "lessThan",
	noLessThan: "noLessThan",
	moreThan: "moreThan",
	noMoreThan: "noMoreThan",
} as const

interface SbConditionalBase {
	_tag: typeof SbOperationTags.conditional
	operand: SbAllowedNumericOperands
	test: SbAllowedNumericOperands
}

export interface SbEqualTo extends SbConditionalBase {
	operation: typeof SbConditionalOperations.equalTo
}

export interface SbUnequalTo extends SbConditionalBase {
	operation: typeof SbConditionalOperations.unequalTo
}

export interface SbLessThan extends SbConditionalBase {
	operation: typeof SbConditionalOperations.lessThan
}

export interface SbMoreThan extends SbConditionalBase {
	operation: typeof SbConditionalOperations.moreThan
}

export interface SbNoLessThan extends SbConditionalBase {
	operation: typeof SbConditionalOperations.noLessThan
}

export interface SbNoMoreThan extends SbConditionalBase {
	operation: typeof SbConditionalOperations.noMoreThan
}

export type SbConditionalOperation =
	| SbEqualTo
	| SbUnequalTo
	| SbLessThan
	| SbMoreThan
	| SbNoLessThan
	| SbNoMoreThan

export const SbAlgebraicOperations = {
	and: "and",
	or: "or",
	xor: "xor",
} as const

interface SbAlgebraicBase {
	_tag: typeof SbOperationTags.algebraic
	operands: Array<SbOperation>
}

export interface SbAndOperation extends SbAlgebraicBase {
	operation: typeof SbAlgebraicOperations.and
}

export interface SbOrOperation extends SbAlgebraicBase {
	operation: typeof SbAlgebraicOperations.or
}

export type SbAlgebraicOperation = SbAndOperation | SbOrOperation

export type SbOperation =
	| SbAlgebraicOperation
	| SbConditionalOperation
	| SbInjectableOperation
	| SbNumericOperation
