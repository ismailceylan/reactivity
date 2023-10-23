export default function bind()
{
	const bindings = [];
	
	function binder( callback )
	{
		const index = bindings.push( callback ) - 1;
	
		return function unbind()
		{
			delete bindings[ index ];
		}
	}

	return { bindings, binder }
}
