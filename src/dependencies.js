export const deps = new Set;

export default function dependencies( effects )
{
	// we should make sure deps stack is empty
	deps.clear();

	return {
		returnValue: effects(),
		refs: [ ...deps ]
	}
}
