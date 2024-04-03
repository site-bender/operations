import { isNone, some } from ".."

type MapF = <A, B>(f: (a: A) => B) => (o: Option<A>) => Option<B>

const map: MapF = f => o => (isNone(o) ? o : some(f(o.value)))

export default map
