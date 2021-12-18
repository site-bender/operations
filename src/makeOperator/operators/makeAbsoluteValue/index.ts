import makeOperator from '../..'
import {
	AbsoluteValueOperation,
	Injector,
	Operation,
} from '../../../types/operations'
import { NumberValue } from '../../../types/values'
import calculateAbsoluteValue from './calculateAbsoluteValue'

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
