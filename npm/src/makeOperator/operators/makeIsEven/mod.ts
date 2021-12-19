import makeOperator from '../../mod.js'
import {
	Injector,
	IsEvenOperation,
	Operation,
} from '../../../types/operations.js'
import { IntegerValue } from '../../../types/values.js'
import checkIsEven from './checkIsEven/mod.js'

export default function makeIsEven(operation: IsEvenOperation): Injector {
	const { operand } = operation as IsEvenOperation

	const value = (operand as Operation).operatorType
		? makeOperator(operand as Operation)
		: () => operand

	return function isEven() {
		return checkIsEven(value() as IntegerValue | number)
	}
}
