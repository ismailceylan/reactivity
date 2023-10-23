export const deps = new Set;

export default function dependencies( effects )
{
	// we should make sure backup current dependencies
	// to open a clean room for this capturing session
	const before = [ ...deps ];

	// room cleaning
	deps.clear();

	const data =
	{
		// reactive objects in this callback are gonna
		// register themselves into the deps set
		returnValue: effects(),
		// we collected refs
		refs: [ ...deps ]
	}

	// we should make sure clean our mess
	deps.clear();

	// restore previous session
	before.forEach( item =>
		deps.add( item )
	);

	return data;
}
