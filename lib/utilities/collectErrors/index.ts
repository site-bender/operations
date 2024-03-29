import { isLeft, left } from "../../fp/either"

type CollectErrors = <T>(
	r: Array<Left<Array<string>> | Right<T>>,
) => Left<Array<string>> | Array<Right<T>>
const collectErrors: CollectErrors = <T>(
	results: Array<Left<Array<string>> | Right<T>>,
) => {
	const lefts = results.filter(r => isLeft(r))

	if (lefts.length) {
		return left(
			lefts.reduce(
				(acc, error) => acc.concat((error as Left<Array<string>>).left),
				[] as Array<string>,
			),
		) as Left<Array<string>>
	}

	return results as Array<Right<T>>
}

export default collectErrors
