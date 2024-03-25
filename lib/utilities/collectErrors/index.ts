import type { Either, Left } from "fp-ts/lib/Either"
import { isLeft, left } from "fp-ts/lib/Either"

const collectErrors = <T>(results: Array<T>): Either<Array<string>, T> => {
	const lefts = results.filter((r) => isLeft(r))

	if (lefts.length) {
		return left(
			lefts.reduce(
				(acc, error) => acc.concat((error as Left<Array<string>>).left),
				[] as Array<string>,
			),
		)
	}

	return results
}

export default collectErrors
