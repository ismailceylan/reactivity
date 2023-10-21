export default function once()
{
	const stack = [];
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
	
	function queue( val, old, bindings )
	{
		stack.push([ val, old, bindings ]);

		if( ! isMounted )
		{
			mount();
		}
	}

	function handleStack()
	{
		const first = stack.shift();
		const last = stack.pop() || first;

		const bindings = Array.isArray( first[ 2 ])
			?   first[ 2 ]
			: [ first[ 2 ]];

		for( const cb of bindings )
		{
			cb && cb( last[ 0 ], first[ 1 ]);
		}

		stack.length = 0;
		isMounted = false;
	}

	return queue;
}
