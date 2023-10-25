import { deps } from "./dependencies.js";
import { once, bind, isProxyable, resource } from "./utils/index.js";
import { symIsReactiveTag, symBindMethodTag } from "./symbols.js";
import { watch } from "./index.js";

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
			if( Object.is( value, target[ key ]))
			{
				return true;
			}

			if( isProxyable( value ))
			{
				value = reactive( value );

				watch( value, () =>
					queue( "reactive:" + id, proxy, proxy, bindings )
				);
			}

			target[ key ] = value;

			queue( "reactive:" + id, proxy, proxy, bindings );

			return true;
		}
	});
}
