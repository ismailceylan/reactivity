import { deps } from "./dependencies.js";
import { once, bind } from "./utils/index.js";
import { symIsReactiveTag, symBindMethodTag } from "./symbols.js";

export default function reactive( initial )
{
	const queue = once();
	const { bindings, binder } = bind();

	return new Proxy( initial,
	{
		get( target, key, proxy )
		{
			if( key === symIsReactiveTag )
			{
				return true;
			}

			if( key === symBindMethodTag )
			{
				return binder;
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
