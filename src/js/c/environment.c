#include <stdlib.h>
#include <stdio.h>
#include <emscripten.h>
#include <string.h>

int getCellStatus(int status, int neighboursCount) {
	switch(neighboursCount) {
		case 3: 
			status = 1;
			break;
		case 2:
			break;
		default:
			status = 0;
	}

	return status;
}


int getLineCount(char *current, int column, int boundLeft, int boundRight) {
	int offset = boundLeft + column;
	int left = (offset == boundLeft) ? current[boundRight] : current[offset - 1];
	int right = (offset == boundRight) ? current[boundLeft] : current[offset + 1]; 

	return current[offset] + left + right;
}

int getNeighboursCount(char *current, int column, int line, int height, int *bounds) {
	int previousLine = (line == 0) ? height : line - 1;
	int nextLine = (line == height) ? 0 : line + 1;

  	return getLineCount(current, column, bounds[line], bounds[line + height])
      	+ getLineCount(current, column, bounds[nextLine], bounds[nextLine + height])
      	+ getLineCount(current, column, bounds[previousLine], bounds[previousLine + height])
      	- current[bounds[line] + column];
}

EMSCRIPTEN_KEEPALIVE
void createBounds(int *bounds, int width, int height) {
	int leftBound = 0;

	for (int i = 0; i < height; i++) {
		leftBound = i * width;
		bounds[i] = leftBound;
		bounds[i + height] = leftBound + width - 1;
	}

	return;
}

EMSCRIPTEN_KEEPALIVE
void getNextState(char *current, char *next, int *bounds, int width, int height) {
	createBounds(bounds, width, height);
	int maxHeight = height - 1;
	int index = 0;

	for (int line = 0; line < height; line++) {
		for (int column = 0; column < width; column++) {
			next[index] = getCellStatus(
				current[index],
				getNeighboursCount(current, column, line, maxHeight, bounds)
			);

			index++;
		}
	}

	return;
}