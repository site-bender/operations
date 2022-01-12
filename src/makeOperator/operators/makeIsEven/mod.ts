import {
	Injector,
	IsEvenOperation,
	Operation,
} from "../../../types/operations.ts"
import type { IntegerValue } from "../../../types/values.ts"
import makeOperator from "../../mod.ts"
import checkIsEven from "./checkIsEven/mod.ts"

export default function makeIsEven(operation: IsEvenOperation): Injector {
	const { operand } = operation as IsEvenOperation

	const value = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function isEven() {
		return checkIsEven(value() as IntegerValue | number)
	}
}
