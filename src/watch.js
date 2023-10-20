export default function watch( source, callback )
{
	const unbind = source.bind( callback );

	return function stopWatch()
	{
		unbind();
	}
}
