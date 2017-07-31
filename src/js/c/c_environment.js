import em_module from './environment'

const getNextStateC = em_module.cwrap('getNextState','number',['array', 'number', 'number']);

export function initializeEnv(width, height) {
	const offset = em_module._malloc(width * height * 8);
}

export function getNextState(gameMatrix, width, height, memoryOffset) {
	const numberOfCells = width * height;

	em_module.HEAPU8.set(gameMatrix, memoryOffset);

	getNextStateC(gameMatrix, width, height);

	let nextState = new Uint8Array(width * height);

	for (let i = 0; i < numberOfCells; i++) {
		let internalOffset = memoryOffset + (8 * i);
		nextState[i] = em_module.getValue(internalOffset,'i8');
	}

	return nextState;
} 
