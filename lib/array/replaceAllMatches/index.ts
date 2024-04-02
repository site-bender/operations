export type ReplaceAllMatchesF = (
	re: RegExp,
) => (f: (item: string) => string) => (arr: Array<string>) => Array<string>

const replaceAllMatches: ReplaceAllMatchesF = re => f => arr =>
	arr.map(item => (re.test(item) ? f(item) : item))

export default replaceAllMatches
