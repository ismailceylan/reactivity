export default function once()
{
	const stack = [];

	return function snapshot( val, old, bindings )
	{
		stack.push([ val, old, bindings ]);

		if( stack.length === 1 )
		{
			queueMicrotask(() =>
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
			});
		}
	}
}
