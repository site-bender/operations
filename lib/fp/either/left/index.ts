const left = <E, A = never>(e: E): Either<E, A> => ({
	_tag: "Left",
	left: e,
})

export default left
