import { Injector } from '../../../types/operations.js'

export default function makeNoOp(): Injector {
	return function noOp() {
		return {}
	}
}
