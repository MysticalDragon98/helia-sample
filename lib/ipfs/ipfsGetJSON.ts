import { CID } from "multiformats";
import { $helia } from "./index.js";

export async function ipfsGetJSON (cid: CID | string) {
    if (typeof cid === "string") cid = CID.parse(cid);

    return await $helia.json.get(cid);
}