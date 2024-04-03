import identity from "../../functions/identity"
import traverse from "../traverse"

type Sequence = <T>(self: Option<T>[]) => Option<T[]>

const sequence: Sequence = self => traverse(identity)(self)

export default sequence
