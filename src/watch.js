import { isReactive, isRef, unref } from "./index.js";
import { symBindMethodTag } from "./symbols.js";
import { once, resource } from "./utils/index.js";

export default function watch( source, callback )
{
	if( isRef( source ) || isReactive( source ))
	{
		return source[ symBindMethodTag ]( callback );
	}
	else if( Array.isArray( source ))
	{
		const id = resource();
		const queue = once();
		const unbindStack = [];
		let olds = source.map( ref => unref( ref ));
		let news = [ ...olds ];

		source.forEach(( ref, i ) =>
		{
			if( ! isRef( ref ) && ! isReactive( ref ))
			{
				return;
			}

			const unbind = ref[ symBindMethodTag ]( value =>
			{
				news[ i ] = value;
				queue( "watch:" + id, news, olds, callback );
				olds = [ ...news ];
			});

			unbindStack.push( unbind );
		});

		return function unwatch()
		{
			unbindStack.forEach( unbind =>
				unbind()
			);
		}
	}
}
