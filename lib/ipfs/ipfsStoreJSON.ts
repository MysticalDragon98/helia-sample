import { $helia } from "./index.js";

export async function ipfsStoreJSON (json: any) {
    return await $helia.json.add(json);
}