import { isReactive, isRef, unref } from "./index.js";
import { once } from "./utils/index.js";

export default function watch( source, callback )
{
	if( isRef( source ) || isReactive( source ))
	{
		return source.bind( callback );
	}
	else if( Array.isArray( source ))
	{
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

			const unbind = ref.bind( value =>
			{
				news[ i ] = value;
				queue( news, olds, callback );
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
