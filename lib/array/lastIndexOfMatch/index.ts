import { Option, none, some } from "@sitebender/fp/lib/option"

export type LastIndexOfMatchF = (
	re: RegExp,
) => (arr: Array<string>) => Option<number>

const lastIndexOfMatch: LastIndexOfMatchF = re => arr => {
	const index = arr.reduce<number>(
		(out, item, index) => (new RegExp(re).test(item) ? index : out),
		-1,
	)

	return index < 0 ? none : some(index)
}

export default lastIndexOfMatch
