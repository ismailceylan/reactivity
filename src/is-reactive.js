import { symIsReactiveTag } from "./symbols.js";

export default function isReactive( value )
{
	return value[ symIsReactiveTag ] === true;
}
