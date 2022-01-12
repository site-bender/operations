import {
	Injector,
	ModuloOperation,
	Operation,
} from "../../../types/operations.js"
import { NumberValue } from "../../../types/values.js"
import makeOperator from "../../mod.js"
import convertToInteger from "../../utilities/convertToInteger/mod.js"

export default function makeModulo(operation: ModuloOperation): Injector {
	const { dividend, modulus } = operation as ModuloOperation

	const first = (dividend as Operation).operatorType
		? makeOperator(dividend as Operation)
		: () => dividend

	const second = (modulus as Operation).operatorType
		? makeOperator(modulus as Operation)
		: () => modulus

	return function modulo() {
		const left = convertToInteger(first() as NumberValue | number)
		const right = convertToInteger(second() as NumberValue | number)

		return {
			datatype: "integer",
			value: (left.value % right.value) * (left.value / left.value),
		}
	}
}
