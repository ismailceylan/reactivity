import { default as dependencies, deps } from "./dependencies.js";
import { symBindMethodTag } from "./symbols.js";
import { once } from "./utils/index.js";

export default function computed( callback )
{
	const object = { __isRef: true, __isComputed: true }
	const bindings = [];
	const queue = once();
	let invoked = false;
	let dirty = false;
	let latestValue = null;

	Object.defineProperty( object, Symbol.toStringTag,
	{
		value: "Computed"
	});

	Object.defineProperty( object, symBindMethodTag,
	{
		value: callback =>
		{
			const index = bindings.push( callback ) - 1;

			return function unbind()
			{
				delete bindings[ index ];
			}
		}
	});

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
				queue( returnValue, latestValue, bindings );
				latestValue = returnValue;
			}
			else if( dirty )
			{
				const returnValue = callback();

				dirty = false;
				queue( returnValue, latestValue, bindings );
				latestValue = returnValue;
			}

			return latestValue;
		}
	});

	return object;
}
