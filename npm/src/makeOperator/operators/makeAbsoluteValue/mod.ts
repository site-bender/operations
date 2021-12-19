import makeOperator from '../../mod.js'
import {
	AbsoluteValueOperation,
	Injector,
	Operation,
} from '../../../types/operations.js'
import { NumberValue } from '../../../types/values.js'
import calculateAbsoluteValue from './calculateAbsoluteValue/mod.js'

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
