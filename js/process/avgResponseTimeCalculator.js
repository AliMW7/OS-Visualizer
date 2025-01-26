import { getProcesses } from "./processes.js";

const responseInfo = document.getElementById("response-result-box");

const avgResponseTime = () => {
  let totalResponseTime = 0;
  let completedProcesses = 0;

  getProcesses().forEach((process) => {
    if (process.endTime !== undefined) {
      totalResponseTime += Number(process.endTime) - Number(process.start);
      completedProcesses += 1;
    }
  });

  return completedProcesses > 0 ? totalResponseTime / completedProcesses : 0;
};

const ShowAvgResponseTime = (time) => {
  time = parseFloat(time.toFixed(2));
  responseInfo.textContent = `Average Response Time: ${time}`;
};

export { avgResponseTime, ShowAvgResponseTime };
