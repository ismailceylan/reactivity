export default function isRef( value )
{
	const type = Object.prototype.toString.call( value );

	return type == "[object Ref]" || type == "[object Computed]";
}
