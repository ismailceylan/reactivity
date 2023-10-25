import { default as type } from "./utils/type/index.js";

export default function isRef( value )
{
	const tag = type( value );
	return tag == "[object Ref]" || tag == "[object Computed]";
}
