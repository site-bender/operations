import type { Constraint, Validation } from '../types/constraints.js'
import { TypeOfConstraint } from '../types/enums.js'
import not from '../utilities/not/mod.js'
import makeAfterAlphabetically from './validators/alphabetical/makeAfterAlphabetically/mod.js'
import makeBeforeAlphabetically from './validators/alphabetical/makeBeforeAlphabetically/mod.js'
import makeNotAfterAlphabetically from './validators/alphabetical/makeNotAfterAlphabetically/mod.js'
import makeNotBeforeAlphabetically from './validators/alphabetical/makeNotBeforeAlphabetically/mod.js'
import makeAnd from './validators/composers/makeAnd/mod.js'
import makeOr from './validators/composers/makeOr/mod.js'
import makeXor from './validators/composers/makeXor/mod.js'
import makeAfterDate from './validators/date/makeAfterDate/mod.js'
import makeBeforeDate from './validators/date/makeBeforeDate/mod.js'
import makeOnOrAfterDate from './validators/date/makeOnOrAfterDate/mod.js'
import makeOnOrBeforeDate from './validators/date/makeOnOrBeforeDate/mod.js'
import makeAfterDateTime from './validators/datetime/makeAfterDateTime/mod.js'
import makeBeforeDateTime from './validators/datetime/makeBeforeDateTime/mod.js'
import makeAtLeastNCharacters from './validators/length/makeAtLeastNCharacters/mod.js'
import makeAtMostNCharacters from './validators/length/makeAtMostNCharacters/mod.js'
import makeExactlyNCharacters from './validators/length/makeExactlyNCharacters/mod.js'
import makeFewerThanNCharacters from './validators/length/makeFewerThanNCharacters/mod.js'
import makeMoreThanNCharacters from './validators/length/makeMoreThanNCharacters/mod.js'
import makeAtLeastN from './validators/number/makeAtLeastN/mod.js'
import makeAtMostN from './validators/number/makeAtMostN/mod.js'
import makeEqualToN from './validators/number/makeEqualToN/mod.js'
import makeLessThanN from './validators/number/makeLessThanN/mod.js'
import makeMoreThanN from './validators/number/makeMoreThanN/mod.js'
import makeNotEqualToN from './validators/number/makeNotEqualToN/mod.js'
import makeConfirmation from './validators/other/makeConfirmation/mod.js'
import makeMatch from './validators/other/makeMatch/mod.js'
import makeIsOrderedList from './validators/sequence/makeIsOrderedList/mod.js'
import makeIsReversedList from './validators/sequence/makeIsReversedList/mod.js'
import makeDisjointSet from './validators/set/makeDisjointSet/mod.js'
import makeMember from './validators/set/makeMember/mod.js'
import makeOverlappingSet from './validators/set/makeOverlappingSet/mod.js'
import makeSubset from './validators/set/makeSubset/mod.js'
import makeSuperset from './validators/set/makeSuperset/mod.js'
import makeIsArray from './validators/static/makeIsArray/mod.js'
import makeIsBoolean from './validators/static/makeIsBoolean/mod.js'
import makeIsDate from './validators/static/makeIsDate/mod.js'
import makeIsDateTime from './validators/static/makeIsDateTime/mod.js'
import makeIsDuration from './validators/static/makeIsDuration/mod.js'
import makeIsFraction from './validators/static/makeIsFraction/mod.js'
import makeIsInstant from './validators/static/makeIsInstant/mod.js'
import makeIsInteger from './validators/static/makeIsInteger/mod.js'
import makeIsList from './validators/static/makeIsList/mod.js'
import makeIsMap from './validators/static/makeIsMap/mod.js'
import makeIsMember from './validators/static/makeIsMember/mod.js'
import makeIsMonthDay from './validators/static/makeIsMonthDay/mod.js'
import makeIsPrecision from './validators/static/makeIsPrecision/mod.js'
import makeIsReal from './validators/static/makeIsReal/mod.js'
import makeIsSet from './validators/static/makeIsSet/mod.js'
import makeIsString from './validators/static/makeIsString/mod.js'
import makeIsTimeZone from './validators/static/makeIsTimeZone/mod.js'
import makeIsYearMonth from './validators/static/makeIsYearMonth/mod.js'
import makeIsZonedDateTime from './validators/static/makeIsZonedDateTime/mod.js'

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
