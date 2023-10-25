import { deps } from "./dependencies.js";
import { once, bind, isProxyable, resource } from "./utils/index.js";
import { symIsReactiveTag, symBindMethodTag } from "./symbols.js";

export default function reactive( initial )
{
	const id = resource();
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
			if( isProxyable( value ))
			{
				value = reactive( value );
			}
			
			target[ key ] = value;

			queue( "reactive:" + id, proxy, proxy, bindings );

			return true;
		}
	});
}
