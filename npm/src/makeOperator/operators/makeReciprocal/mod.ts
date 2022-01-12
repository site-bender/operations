import {
	Injector,
	Operation,
	ReciprocalOperation,
} from "../../../types/operations.js"
import { NumberValue } from "../../../types/values.js"
import makeOperator from "../../mod.js"
import getReciprocal from "./getReciprocal/mod.js"

export default function makeReciprocal(
	operation: ReciprocalOperation,
): Injector {
	const { operand } = operation as ReciprocalOperation

	const injector = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function reciprocal() {
		return getReciprocal(injector() as NumberValue | number)
	}
}
