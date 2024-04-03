import { pipe } from "./fp/functions"
import * as Option from "./fp/option"
import * as Either from "./fp/either"

type ApOption = <A>(o: Option<A>) => <B>(fab: Option<(a: A) => B>) => Option<B>
const apOption: ApOption = o => fab =>
	Option.isNone(o)
		? o
		: pipe(
				fab,
				Option.map(ab => ab(o.value)),
			)

const bimapOption =
	<A, B>(f: (a: A) => (b: A) => B) =>
	(oa: Option<A>) =>
	(ob: Option<A>): Option<B> =>
		pipe(Option.some(f), apOption(oa), apOption(ob))

type Validation<A> = Either<string[], A>

const apValidation =
	<A>(v: Validation<A>) =>
	<B>(fab: Validation<(a: A) => B>): Validation<B> => {
		if (Either.isLeft(fab) && Either.isLeft(v))
			return Either.left([...fab.left, ...v.left])
		else if (Either.isLeft(fab)) return fab
		else if (Either.isLeft(v)) return v

		return Either.right(fab.right(v.right))
	}

const bimap =
	<A, U>(f: (a: A) => (b: A) => U) =>
	(va: Validation<Option<A>>) =>
	(vb: Validation<Option<A>>): Validation<Option<U>> =>
		pipe(pipe(va, Either.map(bimapOption(f))), apValidation(vb))

export const dual: {
	<
		DataLast extends (...args: Array<any>) => any,
		DataFirst extends (...args: Array<any>) => any,
	>(
		arity: Parameters<DataFirst>["length"],
		body: DataFirst,
	): DataLast & DataFirst
	<
		DataLast extends (...args: Array<any>) => any,
		DataFirst extends (...args: Array<any>) => any,
	>(
		isDataFirst: (args: IArguments) => boolean,
		body: DataFirst,
	): DataLast & DataFirst
} = (arity: any, body: any) => {
	const isDataFirst: (args: IArguments) => boolean =
		typeof arity === "number" ? args => args.length >= arity : arity
	return function (this: any) {
		const args = Array.from(arguments)
		if (isDataFirst(arguments)) {
			return body.apply(this, args)
		}
		return (self: any) => body(self, ...args)
	}
}

//const add: {
//  (a: number): (b: number) => (c: number) => number,
//  (a: number, b: number): (c: number) => number,
//  (a: number, b: number, c: number): number
//} = dual(3, (a: number, b: number, c: number) => a + b + c)
//
//const foo = add(1, 2, 3)
//const bar: (x: number) => number = add(1, 2)
//const baz : (x: number) => (y: number) => number = add(1)

const add = (x: number) => (y: number) => x + y
const add3 = (x: number) => (y: number) => (z: number) => x + y + z

const uncurry =
	f =>
	(...arguments) =>
		arguments.reduce((acc, arg) => acc(arg), f)

const uncurriedAdd = uncurry(add)
const uncurriedAdd3 = uncurry(add3)
