type ReplaceAllMatchesF = (
	r: RegExp,
) => (f: (item: string) => string) => (arr: Array<string>) => Array<string>
const replaceAllMatches: ReplaceAllMatchesF = r => f => arr =>
	arr.map(item => (r.test(item) ? f(item) : item))

export default replaceAllMatches
