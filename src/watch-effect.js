import dependencies from "./dependencies.js";

export default function watchEffect( effects )
{
	const unbindStack = [];
	const deps = dependencies( effects );

	for( const ref of deps )
	{
		unbindStack.push(
			ref.bind( effects )
		);
	}

	return function stopEffectWatch()
	{
		for( const unbind of unbindStack )
		{
			unbind()
		}
	}
}
