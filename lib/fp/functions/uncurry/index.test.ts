import { expect, test } from "vitest"

import uncurry from "."

type Unary = (x: number) => number
type TwoAry = (x: number) => (y: number) => number
type ThreeAry = (x: number) => (y: number) => (y: number) => number

test("un-curries unary functions (returns unchanged)", async () => {
	const unary: Unary = x => x

	expect(uncurry(unary)(5)).toBe(5)
})

test("un-curries 2-ary functions", async () => {
	const twoAry: TwoAry = x => y => x + y

	expect(uncurry(twoAry)(5, 7)).toBe(12)
})

test("un-curries 3-ary functions", async () => {
	const threeAry: ThreeAry = x => y => z => x + y + z

	expect(uncurry(threeAry)(3, 5, 7)).toBe(15)
})
