import { isLeft, left } from "../../fp/either"

type CollectErrors = <T>(
	r: Array<Either<Array<string>, T>>,
) => Left<Array<string>> | Array<Right<T>>

const collectErrors: CollectErrors = results => {
	const lefts = results.filter(r => isLeft(r))

	if (lefts.length) {
		return left(
			lefts.reduce(
				(acc, error) => acc.concat((error as Left<Array<string>>).left),
				[] as Array<string>,
			),
		) as Left<Array<string>>
	}

	return results as Array<Right<(typeof results)[0]>>
}

export default collectErrors
