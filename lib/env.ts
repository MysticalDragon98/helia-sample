import { config } from "dotenv";
import { ok } from "assert";

config();

ok(process.env.P2P_HOSTS, 'Missing required environment variable: P2P_HOSTS');
export const $P2P_HOSTS = process.env.P2P_HOSTS!;
ok(process.env.P2P_PORT, 'Missing required environment variable: P2P_PORT');
export const $P2P_PORT = process.env.P2P_PORT!;
export const $DHT_MODE = process.env.DHT_MODE!;
export const $P2P_KNOWN_PEERS = process.env.P2P_KNOWN_PEERS!;
export const $P2P_PRIVKEY = process.env.P2P_PRIVKEY!;
export const $P2P_PUBKEY = process.env.P2P_PUBKEY!;
