export { default as isMap } from "./is-map.js";
export { default as isArray } from "./is-array.js";
export { default as isObject } from "./is-object.js";
export { default as isProxyable } from "./is-proxyable.js";

export default function type( value )
{
	return Object.prototype.toString.call( value );
}
