import identity from "../../functions/identity"
import pipe from "../../functions/pipe"
import traverse from "../traverse"

type Sequence = <E, A>(self: Array<Either<E, A>>) => Either<E, Array<A>>

const sequence: Sequence = self => pipe(self, traverse(identity))

export default sequence
