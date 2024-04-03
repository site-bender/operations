import { isLeft } from ".."

type Match = <E, B>(
	onLeft: (e: E) => B,
) => <A>(onRight: (a: A) => B) => (e: Either<E, A>) => B

const match: Match = onLeft => onRight => e =>
	isLeft(e) ? onLeft(e.left) : onRight(e.right)

export default match
