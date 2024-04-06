declare module globalThis {
	var cookieStore: (n: string) => {
		name: string
		value: string
	}
}

type AnyFunction = (...args: Array<any>) => any
type UnaryFunction = (args: any) => any
type MapFunction = (args: any, index?: number) => any
type ReduceFunction = (acc: any, item: any, index?: number) => any

interface OperationBase {
	operation: string
	returns: string
}

interface NumericalBase extends OperationBase {
	precision?: number | undefined
	truncation?: "ceiling" | "floor" | "round" | "truncate" | undefined
}

interface AddOperation extends NumericalBase {
	addends: Array<number | NumericOperation>
	operation: "add"
	returns: "number"
}

interface AndOperation extends OperationBase {
	operands: Array<Operation>
	operation: "and"
	returns: "boolean"
}

interface DivideOperation extends NumericalBase {
	dividend: number | NumericOperation
	divisor: number | NumericOperation
	operation: "divide"
	returns: "number"
}

interface MultiplyOperation extends NumericalBase {
	multipliers: Array<number | NumericOperation>
	operation: "multiply"
	returns: "number"
}

interface NegateOperation extends NumericalBase {
	operand: number | NumericOperation
	operation: "negate"
	returns: "number"
}

interface OrOperation extends OperationBase {
	operands: Array<Operation>
	operation: "or"
	returns: "boolean"
}

interface PowerOperation extends NumericalBase {
	base: number | NumericOperation
	exponent: number | NumericOperation
	operation: "power"
	returns: "number"
}

interface RootOperation extends NumericalBase {
	index: number | NumericOperation
	operation: "root"
	radicand: number | NumericOperation
	returns: "number"
}

interface SubtractOperation extends NumericalBase {
	minuend: number | NumericOperation
	operation: "subtract"
	returns: "number"
	subtrahend: number | NumericOperation
}

interface LogicalNumericalOperation extends OperationBase {
	operand: number | NumericOperation
	operation:
		| "equalTo"
		| "moreThan"
		| "lessThan"
		| "noLessThan"
		| "noMoreThan"
		| "unequalTo"
	returns: "number"
	test: number | NumericOperation
}

interface InjectValueOperation extends OperationBase {
	returns: "unit"
	eager?: boolean | undefined
	parse?: boolean | undefined
}

interface FormInputOperation extends InjectValueOperation {
	name: string
	operation: "formInput"
}

interface LocalStorageOperation extends InjectValueOperation {
	key: string
	operation: "localStorage"
}

interface SessionStorageOperation extends InjectValueOperation {
	key: string
	operation: "sessionStorage"
}

type NumericOperation =
	| AddOperation
	| DivideOperation
	| LogicalNumericalOperation
	| MultiplyOperation
	| NegateOperation
	| PowerOperation
	| RootOperation
	| SubtractOperation

type BooleanOperation = AndOperation | OrOperation

type UnitOperation =
	| FormInputOperation
	| LocalStorageOperation
	| SessionStorageOperation

type Operation = NumericOperation | BooleanOperation | UnitOperation
