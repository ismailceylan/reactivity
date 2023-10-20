export default function useOnce()
{
	let timer;

	return function once( callback )
	{
		clearTimeout( timer );
		timer = setTimeout( callback );
	}
}
