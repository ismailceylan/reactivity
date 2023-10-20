export const deps = [];

export default function dependencies( effects )
{
	// we should make sure deps stack is empty
	deps.length = 0;

	effects();

	return deps;
}
