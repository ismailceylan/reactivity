import dependencies from "./dependencies.js";

export default function watchEffect( effects )
{
	const deps = dependencies( effects );

	for( const ref of deps )
	{
		ref.bind( effects );
	}
}
