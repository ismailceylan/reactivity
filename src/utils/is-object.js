import { type } from "./index.js";

export default function isObject( value )
{
	return type( value ) == "[object Object]";
}
