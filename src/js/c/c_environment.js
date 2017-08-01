import em_module from './environment'

const getNextStateC = em_module.cwrap('getNextState', null, ['number', 'number', 'number', 'number', 'number']);
const createBounds = em_module.cwrap('createBounds', null, ['number', 'number', 'number']);
let currentOffset, nextOffset, boundsOffset, width, height, nextStatus, bounds;

export function initializeEnv(currentStatus, w, h) {
	width = w;
	height = h;
	nextStatus = new Uint8Array(width * height).fill(0);
	bounds = new Uint32Array(height * 2).fill(0);
	const memoryCurrent = currentStatus.length + currentStatus.BYTES_PER_ELEMENT;
	const memoryNext = nextStatus.length + nextStatus.BYTES_PER_ELEMENT;
	const memoryBounds = bounds.length + bounds.BYTES_PER_ELEMENT;
	const memoryNeeded = memoryCurrent + memoryNext + memoryBounds;
	
	currentOffset = em_module._malloc(memoryNeeded);
	nextOffset = currentOffset + (width * height);
	boundsOffset = nextOffset + (width * height);

	createBounds(boundsOffset, width, height);
}

export function getNextState(currentStatus) {
	const numberOfCells = width * height;

	em_module.HEAPU8.set(currentStatus, currentOffset);
	em_module.HEAPU8.set(nextStatus, nextOffset);
	em_module.HEAPU8.set(bounds, boundsOffset);

	getNextStateC(currentOffset, nextOffset, boundsOffset, width, height);

	for (let i = 0; i < numberOfCells; i++) {
		let internalOffset = nextOffset + i;
		nextStatus[i] = em_module.getValue(internalOffset,'i8');
	}

	return nextStatus;
} 
