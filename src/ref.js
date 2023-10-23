import { deps } from "./dependencies.js";
import { once, tag } from "./utils/index.js";
import { symBindMethodTag } from "./symbols.js";

export default function ref( initial )
{
	const queue = once();
	const bindings = [];
	const object =
	{
		__isRef: true,
	}

	tag( object, "Ref" );

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
