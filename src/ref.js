import { deps } from "./dependencies.js";

export default function ref( initial )
{
	const bindings = new Set;

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

			if( oldValue === newValue )
			{
				return;
			}

			initial = newValue;
			
			for( const item of bindings )
			{
				item( newValue, oldValue );
			}
		}
	});

	Object.defineProperty( object, "bind",
	{
		value( callback )
		{
			bindings.add( callback );
		}
	});

	return object;
}
