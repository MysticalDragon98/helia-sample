import createP2PNode from "./createP2PNode.js";
import { $DHT_MODE, $P2P_HOSTS, $P2P_KNOWN_PEERS, $P2P_PORT, $P2P_PRIVKEY, $P2P_PUBKEY } from "../env.js";
import { customLog, sequencialColor } from "termx";
import peerIdFromPrivKey from "./peerIdFromPrivKey.js";

export let $libp2p: Awaited<ReturnType<typeof createP2PNode>> = null as any;
const log = customLog(sequencialColor(), 'P2P');

export async function initP2P () {
    const peerId = $P2P_PRIVKEY && $P2P_PUBKEY? await peerIdFromPrivKey($P2P_PUBKEY, $P2P_PRIVKEY) : null;
    const hosts = ($P2P_HOSTS || "").split(",").map(host => host.trim());
    const knownPeers = ($P2P_KNOWN_PEERS || "").split(",").map(peer => peer.trim());

    $libp2p = await createP2PNode({
        peerId,
        listenAddresses: [`/ip4/0.0.0.0/tcp/${$P2P_PORT}`],
        advertiseAddresses: hosts.map(host => `/ip4/${host}/tcp/${$P2P_PORT}`),
        peerAddresses: knownPeers,
        dhtMode: $DHT_MODE === "server"? "server" : "client"
    });

    if (!peerId) {
        log("Temporal Peer ID Generated:");
        log("Public Key:", "0x" + Buffer.from($libp2p.peerId.publicKey!).toString('hex'));
        log("Private Key:", "0x" + Buffer.from($libp2p.peerId.privateKey!).toString('hex'));
    }

    log(`P2P node started!`);
}
