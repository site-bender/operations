import { Injector } from '../../types/operations'

export default function makeNoOp(): Injector {
	return function noOp() {
		return {}
	}
}
