export default function tag( object, tag )
{
	Object.defineProperty( object, Symbol.toStringTag,
	{
		value: tag
	});
}
