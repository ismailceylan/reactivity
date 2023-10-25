import { resource } from "./index.js";

const collection = new Map;

export default function callback( fn )
{
	if( collection.has( fn ))
	{
		return "callback:" + collection.get( fn );
	}

	return "callback:" + collection
		.set( fn, resource())
		.get( fn );
}
