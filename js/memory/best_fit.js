import { renderMemorySections } from "./memory_table.js";
import { showMessage } from "../helpers/message.js";
import {
  getMemorySpaces,
  allocateMemorySpace,
  checkIfRangeEmpty,
  updateHoverState,
  findRangeOfEmpty,
} from "./memory_space.js";
import { sleep } from "../helpers/helpers.js";
import { currentSpeed } from "./speed.js";
import { Display } from "./display.js";
import { readIsCancelled } from "../helpers/cancelFlag.js";

const findBestFit = async (processBlock, isCancelled) => {
  const memorySpaces = getMemorySpaces();
  let bestFitIndex = -1;
  let bestFitSize = 10000000000;
  let startIndex = 0;
  let emptyRangeSize;

  while (startIndex < memorySpaces.length) {
    if (readIsCancelled()) return;

    if (
      startIndex + processBlock.blockSize <= memorySpaces.length &&
      checkIfRangeEmpty(startIndex, processBlock.blockSize)
    ) {
      updateHoverState(startIndex, processBlock.blockSize, true);
      renderMemorySections();
      await sleep(currentSpeed);

      emptyRangeSize = findRangeOfEmpty(startIndex);
      if (emptyRangeSize < bestFitSize) {
        bestFitSize = emptyRangeSize;
        bestFitIndex = startIndex;
      }

      updateHoverState(startIndex, processBlock.blockSize, false);
      renderMemorySections();
      startIndex += emptyRangeSize;
    } else {
      startIndex++;
    }
  }

  if (bestFitIndex !== -1) {
    updateHoverState(bestFitIndex, processBlock.blockSize, true);
    renderMemorySections();
    await sleep(currentSpeed);

    allocateMemorySpace(bestFitIndex, processBlock);
    updateHoverState(bestFitIndex, processBlock.blockSize, false);
    renderMemorySections();
  } else {
    showMessage(
      `No available memory block found for ${processBlock.name}!`,
      "fail"
    );
    await sleep(500);
  }
};

const executeBestFit = async () => {
  await Display("best_fit");
};

export { findBestFit, executeBestFit };
