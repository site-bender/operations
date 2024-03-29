declare module globalThis {
	var cookieStore: (n: string) => {
		name: string
		value: string
	}
}

interface OperationBase {
	operation: string
	returns: string
}

interface AddOperation extends OperationBase {
	addends: Array<number | NumericOperation>
	operation: "add"
	returns: "number"
}

interface AndOperation extends OperationBase {
	operands: Array<Operation>
	operation: "and"
	returns: "boolean"
}

interface DivideOperation extends OperationBase {
	dividend: number | Operation
	divisor: number | Operation
	operation: "divide"
	returns: "number"
}

interface FailOperation extends OperationBase {
	operation: "fail"
	returns: "error"
}

interface MultiplyOperation extends OperationBase {
	multipliers: Array<number | Operation>
	operation: "multiply"
	returns: "number"
}

interface NegateOperation extends OperationBase {
	operand: number | Operation
	operation: "negate"
	returns: "number"
}

interface OrOperation extends OperationBase {
	operands: Array<Operation>
	operation: "or"
	returns: "boolean"
}

interface PowerOperation extends OperationBase {
	base: number | Operation
	exponent: number | Operation
	operation: "power"
	returns: "number"
}

interface RootOperation extends OperationBase {
	index: number | Operation
	operation: "root"
	radicand: number | Operation
	returns: "number"
}

interface SubtractOperation extends OperationBase {
	minuend: number | Operation
	operation: "subtract"
	returns: "number"
	subtrahend: number | Operation
}

interface LogicalNumericalOperation extends OperationBase {
	operand: number | Operation
	operation:
		| "equalTo"
		| "greaterThan"
		| "lessThan"
		| "noLessThan"
		| "noMoreThan"
		| "unequalTo"
	returns: "number"
	test: number | Operation
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

type Operation =
	| NumericOperation
	| BooleanOperation
	| UnitOperation
	| FailOperation
