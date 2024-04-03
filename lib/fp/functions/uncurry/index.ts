import reduce from "../../array/reduce"

type Params<F> = F extends (arg: infer A) => infer R
	? [A, ...(R extends (arg: any) => any ? Params<R> : [])]
	: never

type Result<F> = F extends (arg: any) => infer R
	? R extends (arg: any) => infer R2
		? Result<R2>
		: R
	: F

type Uncurry<F> = (...a: Params<F>) => Result<F>

const uncurry =
	<F extends (arg: any) => any>(fn: F): Uncurry<F> =>
	(...args: Params<F>): Result<F> => {
		/* v8 ignore next */
		return reduce<any, any>((f, a) => (typeof f === "function" ? f(a) : f))(fn)(
			args,
		)
	}

export default uncurry
