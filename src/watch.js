import { once } from "./utils/index.js";

export default function watch( source, callback )
{
	const snapshot = once();

	if( Array.isArray( source ))
	{
		const unbindStack = [];
		let olds = source.map( ref => ref.value );
		let news = [ ...olds ];

		source.forEach(( ref, i ) =>
		{
			const unbind = ref.bind( value =>
			{
				news[ i ] = value;
				snapshot( news, olds, callback );
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
	else
	{
		const unbind = source.bind( callback );
	
		return function unwatch()
		{
			unbind();
		}
	}
}
