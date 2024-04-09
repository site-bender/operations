import identity from "../../functions/identity"
import pipe from "../../functions/pipe"
import traverse from "../traverse"

type Sequence = <T>(self: Array<Option<T>>) => Option<Array<T>>

const sequence: Sequence = self => pipe(self, traverse(identity))

export default sequence
