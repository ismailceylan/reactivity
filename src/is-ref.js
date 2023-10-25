import { type } from "./utils/index.js";

export default function isRef( value )
{
	const tag = type( value );
	return tag == "[object Ref]" || tag == "[object Computed]";
}
