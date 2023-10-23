import { deps } from "./dependencies.js";
import { once, tag, bindable } from "./utils/index.js";

export default function ref( initial )
{
	const queue = once();
	const object = { __isRef: true }
	const { bindings } = bindable( object );

	tag( object, "Ref" );

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

	return object;
}
