import { default as dependencies, deps } from "./dependencies.js";
import { once, tag, bindable, resource } from "./utils/index.js";
import { symBindMethodTag } from "./symbols.js";

export default function computed( callback )
{
	const id = resource();
	const object = { __isRef: true, __isComputed: true }
	const { bindings } = bindable( object );
	const queue = once();
	let invoked = false;
	let dirty = false;
	let latestValue = null;

	tag( object, "Computed" );

	Object.defineProperty( object, "value",
	{
		get()
		{
			deps.add( object );

			if( ! invoked )
			{
				const { refs, returnValue } = dependencies( callback );

				for( const ref of refs )
				{
					ref[ symBindMethodTag ](() =>
						dirty = true
					);
				}

				invoked = true;
				queue( "computed:" + id, returnValue, latestValue, bindings );
				latestValue = returnValue;
			}
			else if( dirty )
			{
				const returnValue = callback();

				dirty = false;
				queue( "computed:" + id, returnValue, latestValue, bindings );
				latestValue = returnValue;
			}

			return latestValue;
		}
	});

	return object;
}
