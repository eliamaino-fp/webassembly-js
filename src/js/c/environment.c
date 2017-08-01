#include <stdlib.h>
#include <stdio.h>
#include <emscripten.h>
#include <string.h>

int dead = 0;
int alive = 1;

int minCount = 2;
int maxCount = 3;

int getCellStatus(int status, int neighboursCount) {
	switch(neighboursCount) {
		case 3: 
			status = alive;
			break;
		case 2:
			break;
		default:
			status = dead;
	}

	return status;
}


int getLineCount(char *current, int column, int boundLeft, int boundRight) {
	int offset = boundLeft + column;
	int left = (offset == boundLeft) ? current[boundRight] : current[offset - 1];
	int right = (offset == boundRight) ? current[boundLeft] : current[offset + 1]; 

	return current[offset] + left + right;
}

int getNeighboursCount(char *current, int column, int line, int height, int width, char *bounds) {
	int previousLine = (line == 0) ? height : line - 1;
	int nextLine = (line == height) ? 0 : line + 1;

  	return getLineCount(current, column, bounds[line], bounds[line + width])
      	+ getLineCount(current, column, bounds[nextLine], bounds[nextLine + width])
      	+ getLineCount(current, column, bounds[previousLine], bounds[previousLine + width])
      	- current[bounds[line] + column];
}

void createBounds(char *bounds, int width, int height) {
	int leftBound = 0;

	for (int i = 0; i < height; i++) {
		leftBound = i * width;
		bounds[i] = leftBound;
		bounds[i + width] = leftBound + width - 1;
	}

	return;
}

EMSCRIPTEN_KEEPALIVE
void getNextState(char *current, char *next, char *bounds, int width, int height) {
	createBounds(bounds, width, height);
	int maxHeight = height - 1;
	int index = 0;

	for (int i = 0; i < height; i++) {
		for (int j = 0; j < width; j++) {
			next[index] = getCellStatus(
				current[index],
				getNeighboursCount(current, j, i, maxHeight, width, bounds)
			);

			index++;
		}
	}

	return;
}