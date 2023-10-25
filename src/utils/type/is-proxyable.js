import { isArray, isMap, isObject } from "./index.js";

export default function isProxyable( value )
{
	return isArray( value ) || isMap( value ) || isObject( value );
}
