type MatchF = (re: RegExp) => (str: string) => Array<string>

const match: MatchF = re => str => {
	const m = str.match(new RegExp(re, "g"))

	return m == null ? [] : m
}

export default match
