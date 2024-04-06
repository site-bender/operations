export type MapF = <F extends MapFunction>(
	f: F,
) => (arr: Array<Parameters<F>[0]>) => Array<ReturnType<F>>

const map: MapF = f => arr => arr.map(f)

export default map
