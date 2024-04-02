type ReplaceAllF = (
	r: RegExp | string,
) => (substitute: string) => (str: string) => string

const replaceAll: ReplaceAllF = r => substitute => str =>
	str.replaceAll(
		typeof r === "string" ? r : new RegExp(r, `${r.flags}g`),
		substitute,
	)

export default replaceAll
