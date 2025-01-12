import { webcrypto as crypto } from 'node:crypto';

export const urlAlphabet = 'userandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzict';

const POOL_SIZE_MULTIPLIER = 128;
let pool: Uint8Array, poolOffset: number;

function fillPool(bytes: number) {
	if (!pool || pool.length < bytes) {
		pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
		crypto.getRandomValues(pool);
		poolOffset = 0;
	} else if (poolOffset + bytes > pool.length) {
		crypto.getRandomValues(pool);
		poolOffset = 0;
	}
	poolOffset += bytes;
}

export function getUniqueId(size = 6) {
	fillPool((size |= 0));
	let id = '';
	for (let i = poolOffset - size; i < poolOffset; i++) {
		id += urlAlphabet[pool[i] & 63];
	}
	return id;
}
