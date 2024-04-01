import { isNone } from ".."

type FlatMap = <A, B>(f: (a: A) => Option<B>) => (o: Option<A>) => Option<B>

const flatMap: FlatMap = f => o => (isNone(o) ? o : f(o.value))

export default flatMap
