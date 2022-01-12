import {
	Injector,
	IsOddOperation,
	Operation,
} from "../../../types/operations.ts"
import type { IntegerValue } from "../../../types/values.ts"
import makeOperator from "../../mod.ts"
import checkIsOdd from "./checkIsOdd/mod.ts"

export default function makeIsOdd(operation: IsOddOperation): Injector {
	const { operand } = operation as IsOddOperation

	const value = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function isOdd() {
		return checkIsOdd(value() as IntegerValue | number)
	}
}
