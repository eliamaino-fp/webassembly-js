describe('The Environment', () => {
  describe('setCellStatus', () => {
    it('should kill a cell by overpopulation', () => {
      expect(enviroment.getCellStatus(LIVE, 1)).toBe(DEAD);
    })
  });
})