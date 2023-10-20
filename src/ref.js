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
			if( initial === value )
			{
				return;
			}
			
			for( const item of bindings )
			{
				item( value, initial );
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
