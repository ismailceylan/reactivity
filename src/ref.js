import { deps } from "./dependencies.js";

export default function ref( initial )
{
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
			for( const item of bindings )
			{
				item( initial, value );
			}

			initial = value;
		}
	});

	Object.defineProperty( object, "bind",
	{
		value( callback )
		{
			bindings.push( callback );
		}
	});

	return object;
}
