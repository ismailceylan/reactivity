import { deps } from "./dependencies.js";
import { once, tag, bindable, resource } from "./utils/index.js";

export default function ref( initial )
{
	const id = resource();
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

			queue( "ref:" + id, newValue, oldValue, bindings );
		}
	});

	return object;
}
