import { deps } from "./dependencies.js";
import { once } from "./utils/index.js";
import { symIsReactiveTag } from "./symbols.js";

export default function reactive( initial )
{
	const queue = once();
	const bindings = [];

	function bind( callback )
	{
		const index = bindings.push( callback ) - 1;

		return function unbind()
		{
			delete bindings[ index ];
		}
	}

	return new Proxy( initial,
	{
		get( target, key, proxy )
		{
			if( key === symIsReactiveTag )
			{
				return true;
			}

			if( key === "bind" )
			{
				return bind;
			}

			deps.add( proxy );
			return target[ key ];
		},

		set( target, key, value, proxy )
		{
			target[ key ] = value;

			queue( proxy, proxy, bindings );

			return true;
		}
	});
}
