import makeIsMap from './mod.ts'
import type {
	MapTypeConstraint,
	Validation,
} from '../../../../types/constraints.ts'
import { TypeOfConstraint } from '../../../../types/enums.ts'
import type { MapValue } from '../../../../types/values.ts'
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts'

const constraint: MapTypeConstraint = {
	constraintType: TypeOfConstraint.IS_MAP,
}

Deno.test('[makeIsMap] returns correct validation when value is a map', () => {
	const stringValidation: Validation = {
		datatype: 'map',
		value: 'red:f00,green:0f0,blue:00f',
	}

	assertEquals(makeIsMap(constraint)(stringValidation), stringValidation)

	const objectValidation: Validation = {
		datatype: 'map',
		value: {
			red: 'f00',
			green: '0f0',
			blue: '00f',
		},
	}

	assertEquals(makeIsMap(constraint)(objectValidation), objectValidation)

	const mapValidation: Validation = {
		datatype: 'map',
		value: new Map([
			['red', 'f00'],
			['green', '0f0'],
			['blue', '00f'],
		]),
	}

	assertEquals(makeIsMap(constraint)(mapValidation), mapValidation)
})

Deno.test('[makeIsMap] returns error when value is not a map', () => {
	const validation: Validation & MapValue = {
		datatype: 'map',
		// @ts-ignore: for testing purposes
		value: 666,
	}

	assertEquals(makeIsMap(constraint)(validation), {
		...validation,
		isInvalid: true,
		errors: [
			{
				error: TypeOfConstraint.IS_MAP,
				constraint,
				errorMessage:
					"TypeError: Cannot use 'in' operator to search for 'entries' in 666",
			},
		],
	})
})
