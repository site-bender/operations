const right = <A, E = never>(a: A): Either<E, A> => ({
	_tag: "Right",
	right: a,
})

export default right
