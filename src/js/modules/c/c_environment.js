import em_module from './environment';

export function cEnvironment(width, height, initialState) {
	let numberOfCells = width * height;
	
	// Initialize C wrapped functions
	let	getNextStateC = em_module.cwrap('getNextState', null, ['number', 'number', 'number', 'number', 'number']),
		createBounds = em_module.cwrap('createBounds', null, ['number', 'number', 'number']);

	// Initialize memory
	let	nextState = new Uint8Array(width * height).fill(0),
		bounds = new Uint32Array(height * 2).fill(0),
	    memoryCurrent = initialState.length + initialState.BYTES_PER_ELEMENT,
		memoryNext = nextState.length + nextState.BYTES_PER_ELEMENT,
		memoryBounds = bounds.length + bounds.BYTES_PER_ELEMENT,
		memoryNeeded = memoryCurrent + memoryNext + memoryBounds,
		currentOffset = em_module._malloc(memoryNeeded),
		nextOffset = currentOffset + memoryCurrent,
		boundsOffset = nextOffset + memoryNext;

	em_module.HEAPU8.set(initialState, currentOffset);
	em_module.HEAPU8.set(nextState, nextOffset);
	em_module.HEAPU8.set(bounds, boundsOffset);

	createBounds(boundsOffset, width, height);

	return function getNextState() {
		getNextStateC(currentOffset, nextOffset, boundsOffset, width, height);

		for (let i = 0; i < numberOfCells; i++) {
			let internalOffset = nextOffset + i;
			nextState[i] = em_module.getValue(internalOffset,'i8');
		}

	let no = nextOffset;
	nextOffset = currentOffset;
	currentOffset = no;

	return nextState;
	}
}
