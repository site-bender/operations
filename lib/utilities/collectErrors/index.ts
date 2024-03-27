import type { Either, Left, Right } from "fp-ts/lib/Either"
import { isLeft, left } from "fp-ts/lib/Either"

type CollectErrors<T> = (
	r: Array<Left<Array<string>>, Right<T>>,
) => Either<Array<string>, never> | Array<Right<T>>
const collectErrors: CollectErrors<T> = results => {
	const lefts = results.filter(r => isLeft(r))

	if (lefts.length) {
		return left(
			lefts.reduce(
				(acc, error) => acc.concat((error as Left<Array<string>>).left),
				[] as Array<string>,
			),
		) as Either<Array<string>, never>
	}

	return results
}

export default collectErrors
