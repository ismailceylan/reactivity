import dependencies from "./dependencies.js";
import { symBindMethodTag } from "./symbols.js";

export default function watchEffect( effects )
{
	const unbindStack = [];
	const deps = dependencies( effects );

	for( const ref of deps )
	{
		unbindStack.push(
			ref[ symBindMethodTag ]( effects )
		);
	}

	return function stopEffectWatch()
	{
		for( const unbind of unbindStack )
		{
			unbind();
		}
	}
}
