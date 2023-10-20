import { useOnce } from "./utils/index.js";

export default function watch( source, callback )
{
	if( Array.isArray( source ))
	{
		const once = useOnce();
		const unbindStack = [];
		let olds = source.map( ref => ref.value );
		let news = [ ...olds ];

		source.forEach(( ref, i ) =>
		{
			const unbind = ref.bind( value =>
			{
				news[ i ] = value;

				once(() =>
					callback( news, olds )
				);

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
