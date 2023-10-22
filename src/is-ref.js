export default function isRef( value )
{
	return Object.prototype.toString.call( value ) == "[object Ref]";
}
