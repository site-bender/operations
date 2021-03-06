import { TypeOfOperator } from '../types/enums'
import { Injector, InjectValueOperation, Operation } from '../types/operations'
import { Value } from '../types/values'
import makeDivide from './makeDivide'
import makeIsEven from './makeIsEven'
import makeIsOdd from './makeIsOdd'
import makeMaximum from './makeMaximum'
import makeMinimum from './makeMinimum'
import makeModulo from './makeModulo'
import makeMultiply from './makeMultiply'
import makeNegate from './makeNegate'
import makeNoOp from './makeNoOp'
import makeReciprocal from './makeReciprocal'
import makeRemainder from './makeRemainder'
import makeSubtract from './makeSubtract'
import makeSum from './makeSum'
import makeAbsoluteValue from './operators/makeAbsoluteValue'

const makers = {
	[TypeOfOperator.ABSOLUTE_VALUE]: makeAbsoluteValue,
	[TypeOfOperator.AND]: makeNoOp,
	[TypeOfOperator.AVERAGE]: makeNoOp,
	[TypeOfOperator.CASE]: makeNoOp,
	[TypeOfOperator.CONCATENATE]: makeNoOp,
	[TypeOfOperator.COSECANT]: makeNoOp,
	[TypeOfOperator.COSINE]: makeNoOp,
	[TypeOfOperator.COTANGENT]: makeNoOp,
	[TypeOfOperator.DEFAULT]: makeNoOp,
	[TypeOfOperator.DIVIDE]: makeDivide,
	[TypeOfOperator.DURATION]: makeNoOp,
	[TypeOfOperator.ELSE_IF]: makeNoOp,
	[TypeOfOperator.ELSE]: makeNoOp,
	[TypeOfOperator.EQUAL_TO_N]: makeNoOp,
	[TypeOfOperator.EXPONENT]: makeNoOp,
	[TypeOfOperator.FROM_PERCENT]: makeNoOp,
	[TypeOfOperator.GREATER_THAN_OR_EQUAL_TO_N]: makeNoOp,
	[TypeOfOperator.GREATER_THAN]: makeNoOp,
	[TypeOfOperator.IDENTITY]: makeNoOp,
	[TypeOfOperator.IF]: makeNoOp,
	[TypeOfOperator.INSTANT]: makeNoOp,
	[TypeOfOperator.IS_DISJOINT]: makeNoOp,
	[TypeOfOperator.IS_EVEN]: makeIsEven,
	[TypeOfOperator.IS_MEMBER_OF]: makeNoOp,
	[TypeOfOperator.IS_NEGATIVE]: makeNoOp,
	[TypeOfOperator.IS_ODD]: makeIsOdd,
	[TypeOfOperator.IS_OVERLAPPING]: makeNoOp,
	[TypeOfOperator.IS_POSITIVE]: makeNoOp,
	[TypeOfOperator.IS_SUBSET]: makeNoOp,
	[TypeOfOperator.IS_SUPERSET]: makeNoOp,
	[TypeOfOperator.JOIN]: makeNoOp,
	[TypeOfOperator.LESS_THAN_OR_EQUAL_TO_N]: makeNoOp,
	[TypeOfOperator.LESS_THAN]: makeNoOp,
	[TypeOfOperator.LOG]: makeNoOp,
	[TypeOfOperator.MATCHING]: makeNoOp,
	[TypeOfOperator.MAXIMUM]: makeMaximum,
	[TypeOfOperator.MEAN]: makeNoOp,
	[TypeOfOperator.MEDIAN]: makeNoOp,
	[TypeOfOperator.MINIMUM]: makeMinimum,
	[TypeOfOperator.MODE]: makeNoOp,
	[TypeOfOperator.MODULO]: makeModulo,
	[TypeOfOperator.MULTIPLY]: makeMultiply,
	[TypeOfOperator.NATURAL_LOG]: makeNoOp,
	[TypeOfOperator.NEGATE]: makeNegate,
	[TypeOfOperator.NOT]: makeNoOp,
	[TypeOfOperator.OR]: makeNoOp,
	[TypeOfOperator.PAD]: makeNoOp,
	[TypeOfOperator.POWER]: makeNoOp,
	[TypeOfOperator.RADICAL]: makeNoOp,
	[TypeOfOperator.RANDOM]: makeNoOp,
	[TypeOfOperator.RECIPROCAL]: makeReciprocal,
	[TypeOfOperator.REMAINDER]: makeRemainder,
	[TypeOfOperator.ROUND_DOWN]: makeNoOp,
	[TypeOfOperator.ROUND_UP]: makeNoOp,
	[TypeOfOperator.ROUND]: makeNoOp,
	[TypeOfOperator.SECANT]: makeNoOp,
	[TypeOfOperator.SINE]: makeNoOp,
	[TypeOfOperator.SPLIT]: makeNoOp,
	[TypeOfOperator.STANDARD_DEVIATION]: makeNoOp,
	[TypeOfOperator.SUBTRACT]: makeSubtract,
	[TypeOfOperator.SUM]: makeSum,
	[TypeOfOperator.SWITCH]: makeNoOp,
	[TypeOfOperator.TANGENT]: makeNoOp,
	[TypeOfOperator.TO_BOOLEAN]: makeNoOp,
	[TypeOfOperator.TO_FRACTION]: makeNoOp,
	[TypeOfOperator.TO_INTEGER]: makeNoOp,
	[TypeOfOperator.TO_LOWERCASE]: makeNoOp,
	[TypeOfOperator.TO_PERCENT]: makeNoOp,
	[TypeOfOperator.TO_PRECISION_NUMBER]: makeNoOp,
	[TypeOfOperator.TO_REAL_NUMBER]: makeNoOp,
	[TypeOfOperator.TO_SENTENCE_CASE]: makeNoOp,
	[TypeOfOperator.TO_TITLE_CASE]: makeNoOp,
	[TypeOfOperator.TO_UPPERCASE]: makeNoOp,
	[TypeOfOperator.TRIM]: makeNoOp,
	[TypeOfOperator.TRUNCATE]: makeNoOp,
	[TypeOfOperator.UNEQUAL_TO_N]: makeNoOp,
	[TypeOfOperator.XOR]: makeNoOp,
}

// FIXME
function getRenderer(): [
	boolean,
	{ makeInjector: (operation: Operation) => Injector },
] {
	return [
		false,
		{
			makeInjector: () => () => ({
				datatype: 'integer',
				value: 0,
			}),
		},
	]
}

export default function makeOperator(
	operation: Operation,
	maker?: (operation: Operation) => Injector,
): () => Value {
	const [, { makeInjector }] = getRenderer() || [false, { makeInjector: maker }]

	const operator =
		operation.operatorType === TypeOfOperator.INJECT_VALUE
			? makeInjector
			: (makers[operation.operatorType as keyof typeof makers] as (
					operation: Operation,
			  ) => Injector)

	return operator(operation as InjectValueOperation)
}
