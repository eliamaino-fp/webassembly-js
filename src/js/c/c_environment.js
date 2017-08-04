import em_module from './environment'

export class CEnvironment {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.numberOfCells = this.width * this.height;
		this.getNextStateC = em_module.cwrap('getNextState', null, ['number', 'number', 'number', 'number', 'number']);
		this.createBounds = em_module.cwrap('createBounds', null, ['number', 'number', 'number']);
	}

	initializeEnv(initialState) {
		this.nextState = new Uint8Array(this.width * this.height).fill(0);
		this.bounds = new Uint32Array(this.height * 2).fill(0);
		
		let memoryCurrent = initialState.length + initialState.BYTES_PER_ELEMENT,
            memoryNext = this.nextState.length + this.nextState.BYTES_PER_ELEMENT,
		    memoryBounds = this.bounds.length + this.bounds.BYTES_PER_ELEMENT,
		    memoryNeeded = memoryCurrent + memoryNext + memoryBounds;
		
		this.currentOffset = em_module._malloc(memoryNeeded);
		this.nextOffset = this.currentOffset + memoryCurrent;
		this.boundsOffset = this.nextOffset + memoryNext;

		em_module.HEAPU8.set(initialState, this.currentOffset);
		em_module.HEAPU8.set(this.nextState, this.nextOffset);
		em_module.HEAPU8.set(this.bounds, this.boundsOffset);

		this.createBounds(this.boundsOffset, this.width, this.height);
	}

	getNextState() {
		this.getNextStateC(this.currentOffset, this.nextOffset, this.boundsOffset, this.width, this.height);

		for (let i = 0; i < this.numberOfCells; i++) {
			let internalOffset = this.nextOffset + i;
			this.nextState[i] = em_module.getValue(internalOffset,'i8');
		}

		let no = this.nextOffset;
		this.nextOffset = this.currentOffset;
		this.currentOffset = no;

		return this.nextState;
	}
}
