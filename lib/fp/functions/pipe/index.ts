function pipe<A>(a: A): A
function pipe<A, B>(a: A, ab: (a: A) => B): B
function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
function pipe<A, B, C, D>(
	a: A,
	ab: (a: A) => B,
	bc: (b: B) => C,
	cd: (c: C) => D,
): D
function pipe<A, B, C, D, E>(
	a: A,
	ab: (a: A) => B,
	bc: (b: B) => C,
	cd: (c: C) => D,
	de: (d: D) => E,
): E
function pipe<A, B, C, D, E, F>(
	a: A,
	ab: (a: A) => B,
	bc: (b: B) => C,
	cd: (c: C) => D,
	de: (d: D) => E,
	ef: (e: E) => F,
): F
function pipe(
	a: unknown,
	ab?: Function,
	bc?: Function,
	cd?: Function,
	de?: Function,
	ef?: Function,
): unknown {
	switch (arguments.length) {
		case 1:
			return a
		case 2:
			return ab!(a)
		case 3:
			return bc!(ab!(a))
		case 4:
			return cd!(bc!(ab!(a)))
		case 5:
			return de!(cd!(bc!(ab!(a))))
		case 6:
			return ef!(de!(cd!(bc!(ab!(a)))))
		default:
			const [head, ...rest] = arguments
			return rest.reduce((result, fn) => fn(result), head)
	}
}

export default pipe
