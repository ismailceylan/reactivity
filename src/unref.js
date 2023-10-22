import { isRef } from "./index.js";

export default function unref( maybeRef )
{
	return isRef( maybeRef )
		? maybeRef.value
		: maybeRef;
}
