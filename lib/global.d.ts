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

interface NumericalBase extends OperationBase {
	precision?: number | undefined
	truncation?: "ceiling" | "floor" | "round" | "truncate" | undefined
}

interface AddOperation extends NumericalBase {
	addends: Array<number | Operation>
	operation: "add"
	returns: "number"
}

interface AndOperation extends OperationBase {
	operands: Array<Operation>
	operation: "and"
	returns: "boolean"
}

interface DivideOperation extends NumericalBase {
	dividend: number | Operation
	divisor: number | Operation
	operation: "divide"
	returns: "number"
}

interface FailOperation extends OperationBase {
	operation: "fail"
	returns: "error"
}

interface MultiplyOperation extends NumericalBase {
	multipliers: Array<number | Operation>
	operation: "multiply"
	returns: "number"
}

interface NegateOperation extends NumericalBase {
	operand: number | Operation
	operation: "negate"
	returns: "number"
}

interface OrOperation extends OperationBase {
	operands: Array<Operation>
	operation: "or"
	returns: "boolean"
}

interface PowerOperation extends NumericalBase {
	base: number | Operation
	exponent: number | Operation
	operation: "power"
	returns: "number"
}

interface RootOperation extends NumericalBase {
	index: number | Operation
	operation: "root"
	radicand: number | Operation
	returns: "number"
}

interface SubtractOperation extends NumericalBase {
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

type Operation =
	| AddOperation
	| AndOperation
	| DivideOperation
	| FailOperation
	| LogicalNumericalOperation
	| MultiplyOperation
	| NegateOperation
	| OrOperation
	| PowerOperation
	| RootOperation
	| SubtractOperation
	| FormInputOperation
	| LocalStorageOperation
	| SessionStorageOperation
