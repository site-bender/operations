type ReplaceAllF = (
	r: RegExp | string,
) => (sub: string) => (str: string) => string
const replaceAll: ReplaceAllF = r => sub => str =>
	str.replaceAll(typeof r === "string" ? r : new RegExp(r, "g"), sub)

export default replaceAll
