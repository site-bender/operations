import { right } from "../../fp/either"

type Or = (o: OrOperation) => () => Either<Array<string>, boolean>
const or: Or = op => {
	// TODO: fix this
	return right(true)
}

export default or
