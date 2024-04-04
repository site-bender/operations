import identity from "../../functions/identity"
import traverse from "../traverse"

type Sequence = <T>(self: Array<Option<T>>) => Option<Array<T>>

const sequence: Sequence = self => traverse(identity)(self)

export default sequence
