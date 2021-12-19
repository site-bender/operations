import makeOperator from '../../mod.ts'
import {
	AbsoluteValueOperation,
	Injector,
	Operation,
} from '../../../types/operations.ts'
import type { NumberValue } from '../../../types/values.ts'
import calculateAbsoluteValue from './calculateAbsoluteValue/mod.ts'

export default function makeAbsoluteValue(
	operation: AbsoluteValueOperation,
): Injector {
	const { operand } = operation

	const value = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function absoluteValue() {
		return calculateAbsoluteValue(value() as NumberValue | number)
	} as Injector
}
