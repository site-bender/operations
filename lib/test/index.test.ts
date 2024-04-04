import { expect, test } from "vitest"

type Params<F> = F extends (arg: infer A) => infer R
	? [A, ...(R extends (arg: any) => any ? Params<R> : [])]
	: never

type Result<F> = F extends (arg: any) => infer R
	? R extends (arg: any) => infer R2
		? Result<R2>
		: R
	: F

type Uncurry<F> = (...a: Params<F>) => Result<F>

function uncurry<F extends (arg: any) => any>(fn: F): Uncurry<F> {
	return (...args: Params<F>): Result<F> => {
		let result = fn
		for (const arg of args) {
			if (typeof result === "function") {
				result = result(arg)
			} else {
				return result
			}
		}
		return result as any
	}
}

const add = (a: number) => (b: number) => ""

test("uncurry", () => {
	const foo = uncurry(add)

	expect(foo(1, 1)).toEqual("")

	const bar = uncurry((a: number) => (b: number) => (c: number) => a + b + c)
	expect(bar(1, 2, 3)).toEqual(6)

	const baz = uncurry((a: number) => (b: string) => (c: boolean) => {
		return c ? `${a}${b}` : b
	})

	expect(baz(1, "one", true)).toEqual("1one")
	expect(baz(1, "one", false)).toEqual("one")
})
