import type { Injector } from "../../../types/operations.ts"
import { EmptyValue } from "./../../../types/values.ts"

export default function makeNoOp(): Injector {
	return function noOp() {
		return {} as EmptyValue
	}
}
