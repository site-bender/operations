import { EmptyValue } from './../../../types/values.ts'
import type { Injector } from '../../../types/operations.ts'

export default function makeNoOp(): Injector {
	return function noOp() {
		return {} as EmptyValue
	}
}
