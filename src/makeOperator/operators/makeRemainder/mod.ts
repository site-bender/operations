import {
	Injector,
	Operation,
	RemainderOperation,
} from "../../../types/operations.ts"
import type { NumberValue } from "../../../types/values.ts"
import makeOperator from "../../mod.ts"
import convertToInteger from "../../utilities/convertToInteger/mod.ts"

export default function makeRemainder(operation: RemainderOperation): Injector {
	const { dividend, divisor } = operation as RemainderOperation

	const first = (dividend as Operation).operatorType
		? makeOperator(dividend as Operation)
		: () => dividend

	const second = (divisor as Operation).operatorType
		? makeOperator(divisor as Operation)
		: () => divisor

	return function remainder() {
		const left = convertToInteger(first() as NumberValue | number)
		const right = convertToInteger(second() as NumberValue | number)

		return {
			datatype: "integer",
			value: left.value % right.value,
		}
	}
}
