import { dependencies } from "./index.js";
import { symBindMethodTag } from "./symbols.js";

export default function watchEffect( effects )
{
	const unbindStack = [];
	const { refs } = dependencies( effects );

	for( const ref of refs )
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
