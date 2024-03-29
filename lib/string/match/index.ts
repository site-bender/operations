type MatchF = (r: RegExp) => (str: string) => Array<string>
const match: MatchF = r => str => {
	const m = str.match(new RegExp(r, "g"))

	return m == null ? [] : m
}

export default match
