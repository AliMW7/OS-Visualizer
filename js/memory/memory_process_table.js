import { getMemoryBlocks, reArrangeMemoryBlocks } from "./memory_blocks.js";
import {
  memoryTable,
  deleteAllRowButton,
  createNewRow,
  mobileSection
} from "./process_table_elements.js";

const renderMemoryTable = () => {
  memoryTable.innerHTML = "";
  if (getMemoryBlocks().length) {
    deleteAllRowButton();
    mobileSection.style.border = "1px solid var(--primary-color)";
  }
  reArrangeMemoryBlocks();
  getMemoryBlocks().forEach((process) => {
    memoryTable.appendChild(createNewRow(process));
  });
};

export { renderMemoryTable };
