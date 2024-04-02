type ConcatF = (a?: string) => (b?: string) => string

const concat: ConcatF =
	(a = "") =>
	(b = "") =>
		a.concat(b)

export default concat
