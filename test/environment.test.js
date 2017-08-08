import { expect } from 'chai'
import {
  getCellStatus,
  createBounds,
  getNeighboursCount,
  getNextState
} from '../src/js/modules/environment'
import {
  block,
  beehive,
  loaf,
  boat,
  tub,
  blinker1,
  topHalfBlinker1,
  bottomHalfBlinker1,
  blinker2,
  toad1,
  toad2,
  beacon1,
  beacon2,
  pulsar1,
  pulsar2,
  pulsar3,
  blinker1_3,
  blinker2_3,
  blinker3_3
} from './patterns'

const ALIVE = 1;
const DEAD = 0;

describe('The Environment', () => {
  let grid3x3 = [
      {left: 0, right: 2},
      {left: 3, right: 5},
      {left: 6, right: 8}
    ],
    grid5x3 = [
      {left: 0, right:4},
      {left: 5, right:9},
      {left: 10, right:14}
    ],
    grid5x5 = [
      {left: 0, right:4},
      {left: 5, right:9},
      {left: 10, right:14},
      {left: 15, right:19},
      {left: 20, right:24}
    ];

  describe('setCellStatus', () => {
    it('should kill a cell by underpopulation', () => {
      expect(getCellStatus(ALIVE, 1)).to.be.equal(DEAD);
      expect(getCellStatus(ALIVE, 0)).to.be.equal(DEAD);
    });

    it('should keep alive a cell for 2 or 3 neigbours', () => {
      expect(getCellStatus(ALIVE, 2)).to.be.equal(ALIVE);
      expect(getCellStatus(ALIVE, 3)).to.be.equal(ALIVE);
    });

    it('should kill alive a cell by overpopulation', () => {
      expect(getCellStatus(ALIVE, 4)).to.be.equal(DEAD);
      expect(getCellStatus(ALIVE, 8)).to.be.equal(DEAD);
    });

    it('should revive a dead cell by reproduction', () => {
      expect(getCellStatus(DEAD, 3)).to.be.equal(ALIVE);
      expect(getCellStatus(DEAD, 2)).to.be.equal(DEAD);
      expect(getCellStatus(DEAD, 4)).to.be.equal(DEAD);
    });
  });
  
  describe('createBounds', () => {
    it('should create bounduaries correctly', () => {
      expect(createBounds(3, 3)).to.deep.equal(grid3x3);
      expect(createBounds(5, 3)).to.deep.equal(grid5x3);
      expect(createBounds(5, 5)).to.deep.equal(grid5x5);
      expect(createBounds(0, 0)).to.deep.equal([]);
    });
  });
  
  describe('getNeighboursCount', () => {
    let matrix3x3 = [
        1, 1, 1,
        1, 1, 1,
        1, 1, 1
      ],
      matrix5x5 = [
        1, 1, 0, 0, 1,
        1, 1, 0, 0, 1,
        1, 0, 1, 0, 1,
        0, 0, 0, 1, 0,
        1, 1, 0, 0, 1
      ];

    it('should create bounduaries correctly', () => {
      expect(getNeighboursCount(matrix3x3, 1, 1, 2, grid3x3)).to.equal(8);
      expect(getNeighboursCount(matrix5x5, 0, 0, 4, grid5x5)).to.equal(8);
      expect(getNeighboursCount(matrix5x5, 0, 2, 4, grid5x5)).to.equal(4);
      expect(getNeighboursCount(matrix5x5, 4, 3, 4, grid5x5)).to.equal(5);
      expect(getNeighboursCount(matrix5x5, 4, 4, 4, grid5x5)).to.equal(4);
      expect(getNeighboursCount(matrix5x5, 3, 0, 4, grid5x5)).to.equal(3);
    });
  });

  describe('getNextState', () => {
    it('should keep "Still lifes" patterns', () => {
      expect(Array.from(getNextState(block, 4, 4))).to.be.deep.equal(block);
      expect(Array.from(getNextState(beehive, 6, 5))).to.be.deep.equal(beehive);
      expect(Array.from(getNextState(loaf, 6, 6))).to.be.deep.equal(loaf);
      expect(Array.from(getNextState(boat, 5, 5))).to.be.deep.equal(boat);
      expect(Array.from(getNextState(tub, 5, 5))).to.be.deep.equal(tub);
    });
    
    it('should change "Ocilators" patterns', () => {
      expect(Array.from(getNextState(blinker1, 5, 5))).to.be.deep.equal(blinker2);
      expect(Array.from(getNextState(blinker2, 5, 5))).to.be.deep.equal(blinker1);
      expect(Array.from(getNextState(toad1, 6, 6))).to.be.deep.equal(toad2);
      expect(Array.from(getNextState(toad2, 6, 6))).to.be.deep.equal(toad1);
      expect(Array.from(getNextState(beacon1, 6, 6))).to.be.deep.equal(beacon2);
      expect(Array.from(getNextState(beacon2, 6, 6))).to.be.deep.equal(beacon1);
      expect(Array.from(getNextState(pulsar1, 17, 17))).to.be.deep.equal(pulsar2);
      expect(Array.from(getNextState(pulsar2, 17, 17))).to.be.deep.equal(pulsar3);
      expect(Array.from(getNextState(pulsar3, 17, 17))).to.be.deep.equal(pulsar1);
    });

    it('should calculate next state based on offset', () => {
      expect(Array.from(getNextState(blinker1, 5, 5, 0, 13))).to.be.deep.equal(topHalfBlinker1);
      expect(Array.from(getNextState(blinker1, 5, 5, 13))).to.be.deep.equal(bottomHalfBlinker1);

      expect(Array.from(getNextState(blinker1, 5, 5, 0, 8))).to.be.deep.equal(blinker1_3);
      expect(Array.from(getNextState(blinker1, 5, 5, 8, 16))).to.be.deep.equal(blinker2_3);
      expect(Array.from(getNextState(blinker1, 5, 5, 16))).to.be.deep.equal(blinker3_3);
    });

    it('should be able to split the task', () => {
      let taskDividedByTwo = Array.from(getNextState(blinker1, 5, 5, 0, 13))
        .concat(Array.from(getNextState(blinker1, 5, 5, 13)));
      expect(Array.from(taskDividedByTwo)).to.be.deep.equal(blinker2);

      let bigTaskDividedByTwo = Array.from(getNextState(pulsar1, 17, 17, 0, 144))
        .concat(Array.from(getNextState(pulsar1, 17, 17, 144)));
      expect(Array.from(bigTaskDividedByTwo)).to.be.deep.equal(pulsar2);

      let taskDividedByThree = Array.from(getNextState(pulsar1, 17, 17, 0, 96))
        .concat(
          Array.from(getNextState(pulsar1, 17, 17, 96, 192)),
          Array.from(getNextState(pulsar1, 17, 17, 192))
        );

      expect(Array.from(taskDividedByThree)).to.be.deep.equal(pulsar2);
    })
  });
});
