import { deps } from "./dependencies.js";
import { once } from "./utils/index.js";

export default function ref( initial )
{
	const snapshot = once();
	const bindings = [];
	const object =
	{
		__isRef: true
	}

	Object.defineProperty( object, "value",
	{
		get()
		{
			deps.push( object );
			return initial;
		},

		set( value )
		{
			const newValue = value;
			const oldValue = initial;

			if( newValue === oldValue )
			{
				return;
			}

			initial = newValue;

			snapshot( newValue, oldValue, bindings );
		}
	});

	Object.defineProperty( object, "bind",
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

	return object;
}
