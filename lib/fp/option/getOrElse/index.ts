import isNone from "../isNone"

type GetOrElse = <T>(alt: () => T) => (self: Option<T>) => T

const getOrElse: GetOrElse = alt => self => (isNone(self) ? alt() : self.value)

export default getOrElse
