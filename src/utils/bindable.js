import { symBindMethodTag } from "../symbols.js";
import { bind } from "./index.js";

export default function bindable( object )
{
	const { binder, bindings } = bind();

	Object.defineProperty( object, symBindMethodTag,
	{
		value: binder
	});

	return { bindings }
}
