export const deps = new Set;

export default function dependencies( effects )
{
	// we should make sure deps stack is empty
	deps.clear();

	effects();

	return [ ...deps ];
}
