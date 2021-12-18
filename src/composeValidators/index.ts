import type { Constraint, Validation } from '../types/constraints'
import { TypeOfConstraint } from '../types/enums'
import not from '../utilities/not'
import makeAfterAlphabetically from './validators/alphabetical/makeAfterAlphabetically'
import makeBeforeAlphabetically from './validators/alphabetical/makeBeforeAlphabetically'
import makeNotAfterAlphabetically from './validators/alphabetical/makeNotAfterAlphabetically'
import makeNotBeforeAlphabetically from './validators/alphabetical/makeNotBeforeAlphabetically'
import makeAnd from './validators/composers/makeAnd'
import makeOr from './validators/composers/makeOr'
import makeXor from './validators/composers/makeXor'
import makeAfterDate from './validators/date/makeAfterDate'
import makeBeforeDate from './validators/date/makeBeforeDate'
import makeOnOrAfterDate from './validators/date/makeOnOrAfterDate'
import makeOnOrBeforeDate from './validators/date/makeOnOrBeforeDate'
import makeAfterDateTime from './validators/datetime/makeAfterDateTime'
import makeBeforeDateTime from './validators/datetime/makeBeforeDateTime'
import makeAtLeastNCharacters from './validators/length/makeAtLeastNCharacters'
import makeAtMostNCharacters from './validators/length/makeAtMostNCharacters'
import makeExactlyNCharacters from './validators/length/makeExactlyNCharacters'
import makeFewerThanNCharacters from './validators/length/makeFewerThanNCharacters'
import makeMoreThanNCharacters from './validators/length/makeMoreThanNCharacters'
import makeAtLeastN from './validators/number/makeAtLeastN'
import makeAtMostN from './validators/number/makeAtMostN'
import makeEqualToN from './validators/number/makeEqualToN'
import makeLessThanN from './validators/number/makeLessThanN'
import makeMoreThanN from './validators/number/makeMoreThanN'
import makeNotEqualToN from './validators/number/makeNotEqualToN'
import makeConfirmation from './validators/other/makeConfirmation'
import makeMatch from './validators/other/makeMatch'
import makeIsOrderedList from './validators/sequence/makeIsOrderedList'
import makeIsReversedList from './validators/sequence/makeIsReversedList'
import makeDisjointSet from './validators/set/makeDisjointSet'
import makeMember from './validators/set/makeMember'
import makeOverlappingSet from './validators/set/makeOverlappingSet'
import makeSubset from './validators/set/makeSubset'
import makeSuperset from './validators/set/makeSuperset'
import makeIsArray from './validators/static/makeIsArray'
import makeIsBoolean from './validators/static/makeIsBoolean'
import makeIsDate from './validators/static/makeIsDate'
import makeIsDateTime from './validators/static/makeIsDateTime'
import makeIsDuration from './validators/static/makeIsDuration'
import makeIsFraction from './validators/static/makeIsFraction'
import makeIsInstant from './validators/static/makeIsInstant'
import makeIsInteger from './validators/static/makeIsInteger'
import makeIsList from './validators/static/makeIsList'
import makeIsMap from './validators/static/makeIsMap'
import makeIsMember from './validators/static/makeIsMember'
import makeIsMonthDay from './validators/static/makeIsMonthDay'
import makeIsPrecision from './validators/static/makeIsPrecision'
import makeIsReal from './validators/static/makeIsReal'
import makeIsSet from './validators/static/makeIsSet'
import makeIsString from './validators/static/makeIsString'
import makeIsTimeZone from './validators/static/makeIsTimeZone'
import makeIsYearMonth from './validators/static/makeIsYearMonth'
import makeIsZonedDateTime from './validators/static/makeIsZonedDateTime'

const validators = {
	[TypeOfConstraint.AFTER_ALPHABETICALLY]: makeAfterAlphabetically,
	[TypeOfConstraint.AFTER_DATE]: makeAfterDate,
	[TypeOfConstraint.AFTER_DATE_TIME]: makeAfterDateTime,
	[TypeOfConstraint.AND]: makeAnd,
	[TypeOfConstraint.AT_LEAST_N]: makeAtLeastN,
	[TypeOfConstraint.AT_LEAST_N_CHARACTERS]: makeAtLeastNCharacters,
	[TypeOfConstraint.AT_MOST_N]: makeAtMostN,
	[TypeOfConstraint.AT_MOST_N_CHARACTERS]: makeAtMostNCharacters,
	[TypeOfConstraint.BEFORE_ALPHABETICALLY]: makeBeforeAlphabetically,
	[TypeOfConstraint.BEFORE_DATE]: makeBeforeDate,
	[TypeOfConstraint.BEFORE_DATE_TIME]: makeBeforeDateTime,
	[TypeOfConstraint.CONFIRMED]: makeConfirmation,
	[TypeOfConstraint.DISJOINT_SET]: makeDisjointSet,
	[TypeOfConstraint.EQUAL_TO_N]: makeEqualToN,
	[TypeOfConstraint.EXACTLY_N_CHARACTERS]: makeExactlyNCharacters,
	[TypeOfConstraint.FEWER_THAN_N_CHARACTERS]: makeFewerThanNCharacters,
	[TypeOfConstraint.IS_ARRAY]: makeIsArray,
	[TypeOfConstraint.IS_BOOLEAN]: makeIsBoolean,
	[TypeOfConstraint.IS_DATE]: makeIsDate,
	[TypeOfConstraint.IS_DATE_TIME]: makeIsDateTime,
	[TypeOfConstraint.IS_DURATION]: makeIsDuration,
	[TypeOfConstraint.IS_FRACTION]: makeIsFraction,
	[TypeOfConstraint.IS_INSTANT]: makeIsInstant,
	[TypeOfConstraint.IS_INTEGER]: makeIsInteger,
	[TypeOfConstraint.IS_LIST]: makeIsList,
	[TypeOfConstraint.IS_MAP]: makeIsMap,
	[TypeOfConstraint.IS_MEMBER]: makeIsMember,
	[TypeOfConstraint.IS_MONTH_DAY]: makeIsMonthDay,
	[TypeOfConstraint.IS_PRECISION]: makeIsPrecision,
	[TypeOfConstraint.IS_REAL]: makeIsReal,
	[TypeOfConstraint.IS_SET]: makeIsSet,
	[TypeOfConstraint.IS_STRING]: makeIsString,
	[TypeOfConstraint.IS_TIME_ZONE]: makeIsTimeZone,
	[TypeOfConstraint.IS_YEAR_MONTH]: makeIsYearMonth,
	[TypeOfConstraint.IS_ZONED_DATE_TIME]: makeIsZonedDateTime,
	[TypeOfConstraint.LESS_THAN_N]: makeLessThanN,
	[TypeOfConstraint.MATCHING]: makeMatch,
	[TypeOfConstraint.MEMBER]: makeMember,
	[TypeOfConstraint.MORE_THAN_N]: makeMoreThanN,
	[TypeOfConstraint.MORE_THAN_N_CHARACTERS]: makeMoreThanNCharacters,
	[TypeOfConstraint.NOT_AFTER_ALPHABETICALLY]: makeNotAfterAlphabetically,
	[TypeOfConstraint.NOT_BEFORE_ALPHABETICALLY]: makeNotBeforeAlphabetically,
	[TypeOfConstraint.NOT_EQUAL_TO_N]: makeNotEqualToN,
	[TypeOfConstraint.ON_OR_AFTER_DATE]: makeOnOrAfterDate,
	[TypeOfConstraint.ON_OR_BEFORE_DATE]: makeOnOrBeforeDate,
	[TypeOfConstraint.OR]: makeOr,
	[TypeOfConstraint.ORDERED_LIST]: makeIsOrderedList,
	[TypeOfConstraint.OVERLAPPING_SET]: makeOverlappingSet,
	[TypeOfConstraint.REVERSED_LIST]: makeIsReversedList,
	[TypeOfConstraint.SUBSET]: makeSubset,
	[TypeOfConstraint.SUPERSET]: makeSuperset,
	[TypeOfConstraint.XOR]: makeXor,
}

function noOp(validation: Validation): Validation {
	return validation
}

export default function composeValidators(
	constraint: Constraint,
): (validation: Validation) => Validation {
	if (not(constraint)) {
		return noOp
	}

	const validator = validators[
		constraint.constraintType as TypeOfConstraint
	] as (constraint: Constraint) => (validation: Validation) => Validation

	return validator ? validator(constraint) : () => ({} as Validation)
}
