import { isReactive, isRef } from "./index.js";
import { once } from "./utils/index.js";

export default function watch( source, callback )
{
	if( isRef( source ) || isReactive( source ))
	{
		const unbind = source.bind( callback );
	
		return function unwatch()
		{
			unbind();
		}
	}
	else if( Array.isArray( source ))
	{
		const queue = once();
		const unbindStack = [];
		
		let olds = source.map( ref =>
		{
			if( isRef( ref ))
			{
				return ref.value;
			}
			else if( isReactive( ref ))
			{
				return ref;
			}
		});

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
