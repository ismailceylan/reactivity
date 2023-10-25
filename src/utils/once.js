import { callback } from "./index.js";

const stack = new Map;
const latest = new Map;

export default function once()
{
	let isMounted = false;

	function mount()
	{
		if( isMounted )
		{
			return;
		}

		queueMicrotask( handleStack );
		isMounted = true;
	}

	function queue( resource, val, old, bindings )
	{
		for( const cb of bindings )
		{
			// we should create resource (ref,reactive,computed) specific identifier
			const name = [ resource, callback( cb )].join( "|" );

			if( stack.has( name ))
			{
				stack.set( name, [ cb, val, stack.get( name )[ 1 ]]);
			}
			else
			{
				stack.set( name, [ cb, val, old ]);
			}
		}

		if( ! isMounted )
		{
			mount();
		}
	}

	function handleStack()
	{
		// we have a lot of callbacks and we are
		// sure we should call'em just once with
		// latest state of their refs

		for( const [ name, [ cb, newValue, oldValue ]] of stack )
		{
			if( latest.has( name ))
			{
				const [ _cb, latestNewValue, latestOldValue ] = latest.get( name );

				if( newValue === latestNewValue && oldValue === latestOldValue )
				{
					continue;
				}
			}

			cb && cb( newValue, oldValue );
		}

		latest.clear();

		for( const [ key, value ] of stack )
		{
			latest.set( key, value );
			stack.delete( key );
		}

		isMounted = false;
	}

	return queue;
}
