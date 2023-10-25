import { default as type } from "./index.js";

export default function isArray( value )
{
	return type( value ) == "[object Array]";
}
