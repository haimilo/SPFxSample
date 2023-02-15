import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PnPLogging, LogLevel } from "@pnp/logging";
import { spfi, SPFI, SPFx } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

let _sp: SPFI = null;

export function getSP(context?: WebPartContext): SPFI {
    if (_sp === null && context !== null) {
        // _sp = new SPFI("");

        // You must add the @pnp/logging package to your project to include the PnPLogging class
        // The LogLevel set's at what level a message will be written to the console
        _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Info));
    }
    return _sp;
}
