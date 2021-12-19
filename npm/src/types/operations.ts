import { Temporal } from '@js-temporal/polyfill'
import {
	TypeOfMatch,
	TypeOfOperator,
	TypeOfReturn,
	TypeOfSource,
	TypeOfTrim,
	TypeOfTruncation,
} from './enums.js'
import {
	Arrays,
	DurationValue,
	NumberValue,
	RadianValue,
	Sets,
	SetValue,
	StringValue,
	Value,
	ValueType,
} from './values.js'

export type Injector = () => Value

export type AbsoluteValueOperation = {
	operand: Operation | NumberValue | number
	operatorType: TypeOfOperator.ABSOLUTE_VALUE
}

export type AndOperation = {
	operands: Array<Operation>
	operatorType: TypeOfOperator.AND
}

export type AverageOperation = {
	operands: Array<Operation>
	operatorType: TypeOfOperator.AVERAGE
}

export type CaseOperation = {
	condition: Operation
	operatorType: TypeOfOperator.CASE
	result: Operation
}

export type ConcatenationOperation = {
	operands: Array<Operation>
	operatorType: TypeOfOperator.CONCATENATE
}

export type CosecantOperation = {
	operand: Operation | RadianValue | number
	operatorType: TypeOfOperator.COSECANT
}

export type CosineOperation = {
	operand: Operation | RadianValue | number
	operatorType: TypeOfOperator.COSINE
}

export type CotangentOperation = {
	operand: Operation | RadianValue | number
	operatorType: TypeOfOperator.COTANGENT
}

export type DefaultOperation = {
	operatorType: TypeOfOperator.DEFAULT
	result: Operation
}

export type DivideOperation = {
	decimalPlaces?: number
	dividend: Operation | NumberValue | number
	divisor: Operation | NumberValue | number
	operatorType: TypeOfOperator.DIVIDE
	returnType: TypeOfReturn
	truncationType?: TypeOfTruncation
}

export type DurationOperation = {
	operatorType: TypeOfOperator.DURATION
	operand: Operation | DurationValue | string
}

export type ElseIfOperation = {
	condition: Operation
	operatorType: TypeOfOperator.ELSE_IF
	result: Operation
}

export type ElseOperation = {
	operatorType: TypeOfOperator.ELSE
	result: Operation
}

export type EqualToOperation = {
	operands: Array<Operation | Value>
	operatorType: TypeOfOperator.EQUAL_TO_N
}

export type ExponentOperation = {
	exponent: Operation | NumberValue | number
	operatorType: TypeOfOperator.EXPONENT
}

export type FromPercentOperation = {
	operand: Operation | NumberValue | number
	operatorType: TypeOfOperator.FROM_PERCENT
}

export type GreaterThanOperation = {
	left: Operation | NumberValue | number
	operatorType: TypeOfOperator.GREATER_THAN
	right: Operation | NumberValue | number
}

export type GreaterThanOrEqualToOperation = {
	left: Operation | NumberValue | number
	operatorType: TypeOfOperator.GREATER_THAN_OR_EQUAL_TO_N
	right: Operation | NumberValue | number
}

export type IdentityOperation = {
	operatorType: TypeOfOperator.IDENTITY
	operand: Operation | Value | ValueType
}

export type IfOperation = {
	condition: Operation
	else?: ElseOperation
	elseIfs?: Array<ElseIfOperation>
	operatorType: TypeOfOperator.IF
	result: Operation
}

export type InjectValueOperation = {
	decimalPlaces?: number
	keyValueSeparator?: string | RegExp
	operatorType: TypeOfOperator.INJECT_VALUE
	path: Array<string>
	query?: string
	returnType: TypeOfReturn
	separator?: string | RegExp
	sourceType: TypeOfSource
	url?: string
}

export type InstantOperation = {
	operand?: Operation | Temporal.ZonedDateTime | Temporal.PlainDateTime
	operatorType: TypeOfOperator.INSTANT
}

export type IsDisjointOperation = {
	left: Operation | SetValue | Sets | Arrays | string
	operatorType: TypeOfOperator.IS_DISJOINT
	right: Operation | SetValue | Sets | Arrays | string
}

export type IsEvenOperation = {
	operand: Operation
	operatorType: TypeOfOperator.IS_EVEN
}

export type IsMemberOfOperation = {
	left: Operation | ValueType
	operatorType: TypeOfOperator.IS_MEMBER_OF
	right: Operation | SetValue | Sets | Arrays | string
}

export type IsNegativeOperation = {
	operand: Operation | NumberValue | number
	operatorType: TypeOfOperator.IS_NEGATIVE
}

export type IsOddOperation = {
	operand: Operation
	operatorType: TypeOfOperator.IS_ODD
}

export type IsOverlappingOperation = {
	left: Operation | SetValue | Sets | Arrays | string
	operatorType: TypeOfOperator.IS_OVERLAPPING
	right: Operation | SetValue | Sets | Arrays | string
}

export type IsPositiveOperation = {
	operand: Operation | NumberValue | number
	operatorType: TypeOfOperator.IS_POSITIVE
}

export type IsSubsetOperation = {
	left: Operation | SetValue | Sets | Arrays | string
	operatorType: TypeOfOperator.IS_SUBSET
	right: Operation | SetValue | Sets | Arrays | string
}

export type IsSupersetOperation = {
	left: Operation | SetValue | Sets | Arrays | string
	operatorType: TypeOfOperator.IS_SUPERSET
	right: Operation | SetValue | Sets | Arrays | string
}

export type JoinOperation = {
	operands: Array<Operation>
	operatorType: TypeOfOperator.JOIN
	separator: string
}

export type LessThanOperation = {
	left: Operation | NumberValue | number
	operatorType: TypeOfOperator.LESS_THAN
	right: Operation | NumberValue | number
}

export type LessThanOrEqualToOperation = {
	left: Operation | NumberValue | number
	operatorType: TypeOfOperator.LESS_THAN_OR_EQUAL_TO_N
	right: Operation | NumberValue | number
}

export type LogOperation = {
	base: Operation | NumberValue | number
	operand: Operation | NumberValue | number
	operatorType: TypeOfOperator.NATURAL_LOG
}

export type MatchOperation = {
	operand: Operation
	operatorType: TypeOfOperator.MATCHING
	pattern: string | RegExp
}

export type MaximumOperation = {
	operands: Array<Operation | NumberValue | number>
	operatorType: TypeOfOperator.MAXIMUM
}

export type MeanOperation = {
	operands: Array<Operation | NumberValue | number>
	operatorType: TypeOfOperator.MEAN
}

export type MedianOperation = {
	operands: Array<Operation | NumberValue | number>
	operatorType: TypeOfOperator.MEDIAN
}

export type MinimumOperation = {
	operands: Array<Operation | NumberValue | number>
	operatorType: TypeOfOperator.MINIMUM
}

export type ModeOperation = {
	operands: Array<Operation | NumberValue | number>
	operatorType: TypeOfOperator.MODE
}

export type ModuloOperation = {
	dividend: Operation | NumberValue | number
	modulus: Operation | NumberValue | number
	operatorType: TypeOfOperator.MODULO
	returnType: TypeOfReturn.INTEGER
}

export type MultiplyOperation = {
	decimalPlaces?: number
	operands: Array<Operation>
	operatorType: TypeOfOperator.MULTIPLY
	returnType: TypeOfReturn
	truncationType?: TypeOfTruncation
}

export type NaturalLogOperation = {
	operand: Operation | NumberValue | number
	operatorType: TypeOfOperator.NATURAL_LOG
}

export type NegateOperation = {
	operand: Operation | NumberValue | number
	operatorType: TypeOfOperator.NEGATE
}

export type NotOperation = {
	operand: Operation | Value | ValueType
	operatorType: TypeOfOperator.NOT
}

export type OrOperation = {
	operands: Array<Operation>
	operatorType: TypeOfOperator.OR
}

export type PadOperation = {
	character: string
	operand: Operation
	operatorType: TypeOfOperator.PAD
	padLength: number
}

export type PowerOperation = {
	exponent: Operation | NumberValue | number
	base: Operation | NumberValue | number
	operatorType: TypeOfOperator.POWER
}

export type RadicalOperation = {
	radicand: Operation | NumberValue | number
	index: Operation | NumberValue | number
	operatorType: TypeOfOperator.RADICAL
}

export type RandomOperation = {
	operand: Operation
	operatorType: TypeOfOperator.RANDOM
	seed?: number
}

export type ReciprocalOperation = {
	operand: Operation | NumberValue | number
	operatorType: TypeOfOperator.RECIPROCAL
}

export type RemainderOperation = {
	dividend: Operation | NumberValue | number
	divisor: Operation | NumberValue | number
	operatorType: TypeOfOperator.REMAINDER
	returnType: TypeOfReturn.INTEGER
}

export type RootMeanSquareOperation = {
	operands: Array<Operation>
	operatorType: TypeOfOperator.ROOT_MEAN_SQUARE
}

export type RoundDownOperation = {
	operand: Operation
	operatorType: TypeOfOperator.ROUND_DOWN
}

export type RoundOperation = {
	decimals: number
	operand: Operation
	operatorType: TypeOfOperator.ROUND
}

export type RoundUpOperation = {
	operand: Operation
	operatorType: TypeOfOperator.ROUND_UP
}

export type SecantOperation = {
	operand: Operation | RadianValue | number
	operatorType: TypeOfOperator.SECANT
}

export type SineOperation = {
	operand: Operation | RadianValue | number
	operatorType: TypeOfOperator.SINE
}

export type SplitOperation = {
	operand: Operation
	operatorType: TypeOfOperator.SPLIT
	separator?: string
	matchType?: TypeOfMatch
}

export type StandardDeviationOperation = {
	operands: Array<Operation>
	operatorType: TypeOfOperator.STANDARD_DEVIATION
}

export type SubtractOperation = {
	decimalPlaces?: number
	minuend: Operation | NumberValue | number
	operatorType: TypeOfOperator.SUBTRACT
	returnType: TypeOfReturn
	subtrahend: Operation | NumberValue | number
	truncationType?: TypeOfTruncation
}

export type SumOperation = {
	decimalPlaces?: number
	operands: Array<Operation | NumberValue | number>
	operatorType: TypeOfOperator.SUM
	returnType: TypeOfReturn
	truncationType?: TypeOfTruncation
}

export type SwitchOperation = {
	condition: Operation
	default?: DefaultOperation
	cases?: Array<CaseOperation>
	operatorType: TypeOfOperator.SWITCH
}

export type TangentOperation = {
	operand: Operation | RadianValue | number
	operatorType: TypeOfOperator.TANGENT
}

export type ToBooleanOperation = {
	operand: Operation | Value | ValueType
	operatorType: TypeOfOperator.TO_BOOLEAN
}

export type ToFractionOperation = {
	operand: Operation | Value | ValueType
	operatorType: TypeOfOperator.TO_FRACTION
}

export type ToIntegerOperation = {
	operand: Operation | Value | ValueType
	operatorType: TypeOfOperator.TO_INTEGER
}

export type ToLowercaseOperation = {
	operand: Operation | StringValue | string
	operatorType: TypeOfOperator.TO_LOWERCASE
}

export type ToPercentOperation = {
	operand: Operation | NumberValue | number
	operatorType: TypeOfOperator.TO_PERCENT
}

export type ToPrecisionNumberOperation = {
	operand: Operation | NumberValue | number
	operatorType: TypeOfOperator.TO_PRECISION_NUMBER
	decimalPlaces?: number
}

export type ToRealNumberOperation = {
	operand: Operation | NumberValue | number
	operatorType: TypeOfOperator.TO_REAL_NUMBER
}

export type ToSentenceCaseOperation = {
	operand: Operation | StringValue | string
	operatorType: TypeOfOperator.TO_SENTENCE_CASE
	separator?: string
	matchType?: TypeOfMatch
}

export type ToTitleCaseOperation = {
	operand: Operation | StringValue | string
	operatorType: TypeOfOperator.TO_TITLE_CASE
	separator?: string
	matchType?: TypeOfMatch
}

export type ToUppercaseOperation = {
	operand: Operation | StringValue | string
	operatorType: TypeOfOperator.TO_UPPERCASE
}

export type TrimOperation = {
	operand: Operation
	operatorType: TypeOfOperator.TRIM
	pattern: string | RegExp
	trimType: TypeOfTrim
}

export type TruncateOperation = {
	maxLength: number
	operand: Operation
	operatorType: TypeOfOperator.TRUNCATE
	symbolToAppend?: string
}

export type UnequalToOperation = {
	operands: Array<Operation | Value | ValueType>
	operatorType: TypeOfOperator.UNEQUAL_TO_N
}

export type XorOperation = {
	operands: Array<Operation>
	operatorType: TypeOfOperator.XOR
}

export type Operation =
	| AbsoluteValueOperation
	| AndOperation
	| AverageOperation
	| CaseOperation
	| ConcatenationOperation
	| CosecantOperation
	| CosineOperation
	| CotangentOperation
	| DefaultOperation
	| DivideOperation
	| DurationOperation
	| ElseIfOperation
	| ElseOperation
	| EqualToOperation
	| ExponentOperation
	| FromPercentOperation
	| GreaterThanOperation
	| GreaterThanOrEqualToOperation
	| IdentityOperation
	| IfOperation
	| InstantOperation
	| IsDisjointOperation
	| InjectValueOperation
	| IsEvenOperation
	| IsMemberOfOperation
	| IsNegativeOperation
	| IsOddOperation
	| IsOverlappingOperation
	| IsPositiveOperation
	| IsSubsetOperation
	| IsSupersetOperation
	| JoinOperation
	| LessThanOperation
	| LessThanOrEqualToOperation
	| LogOperation
	| MatchOperation
	| MaximumOperation
	| MeanOperation
	| MedianOperation
	| MinimumOperation
	| ModeOperation
	| ModuloOperation
	| MultiplyOperation
	| NaturalLogOperation
	| NegateOperation
	| NotOperation
	| OrOperation
	| PadOperation
	| PowerOperation
	| RadicalOperation
	| RandomOperation
	| ReciprocalOperation
	| RemainderOperation
	| RootMeanSquareOperation
	| RoundDownOperation
	| RoundOperation
	| RoundUpOperation
	| SecantOperation
	| SineOperation
	| SplitOperation
	| StandardDeviationOperation
	| SubtractOperation
	| SumOperation
	| SwitchOperation
	| ToBooleanOperation
	| ToFractionOperation
	| ToIntegerOperation
	| ToLowercaseOperation
	| ToPercentOperation
	| ToPrecisionNumberOperation
	| ToRealNumberOperation
	| ToSentenceCaseOperation
	| ToTitleCaseOperation
	| ToUppercaseOperation
	| TrimOperation
	| TruncateOperation
	| UnequalToOperation
	| XorOperation
