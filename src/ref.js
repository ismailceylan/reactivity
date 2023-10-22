import { deps } from "./dependencies.js";
import { once } from "./utils/index.js";

export default function ref( initial )
{
	const queue = once();
	const bindings = [];
	const object =
	{
		__isRef: true
	}

	Object.defineProperty( object, "value",
	{
		get()
		{
			deps.add( object );
			return initial;
		},

		set( value )
		{
			const newValue = value;
			const oldValue = initial;

			if( Object.is( newValue, oldValue ))
			{
				return;
			}

			initial = newValue;

			queue( newValue, oldValue, bindings );
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
