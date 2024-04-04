interface Some<A> {
	readonly _tag: "Some"
	readonly value: A
}

interface None {
	readonly _tag: "None"
}

type Option<T> = Some<T> | None

interface Left<E> {
	readonly _tag: "Left"
	readonly left: E
}

interface Right<A> {
	readonly _tag: "Right"
	readonly right: A
}

type Either<E, A> = Left<E> | Right<A>
