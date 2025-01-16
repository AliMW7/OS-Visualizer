import { describe, test, it, expect, vi } from "vitest";
import {FCFSProcessSort} from  "../FCFS.js";


// Disable DOM
vi.mock('../process_table', () => ({
    processTable: null
  }));
vi.mock('../manual_add_process', () => ({
    policy: null
  }));
vi.mock('../timing_policies', () => ({
    policy: null
  }));
vi.mock('../animation_table', () => ({
    policy: null
  }));



/////////////////////////////     Tests    ////////////////////////////

describe('FCFSProcessSort', () => {
    it('Test case 1: Processes with no overlap', () => {
        expect(FCFSProcessSort([
          { name: "P1", start: 0, duration: 3 },
          { name: "P2", start: 5, duration: 2 },
          { name: "P3", start: 10, duration: 1 }
        ])).toStrictEqual([
          { name: "P1", start: 0, duration: 3, endTime: 3 },
          { name: "P2", start: 5, duration: 2, endTime: 7 },
          { name: "P3", start: 10, duration: 1, endTime: 11 }
        ]);
      });
    

      it('Test case 2: Processes with overlapping start times', () => {
        expect(FCFSProcessSort([
          { name: "P1", start: 0, duration: 3 },
          { name: "P2", start: 1, duration: 5 },
          { name: "P3", start: 2, duration: 2 }
        ])).toStrictEqual([
          { name: "P1", start: 0, duration: 3, endTime: 3 },
          { name: "P2", start: 1, duration: 5, endTime: 8 },
          { name: "P3", start: 2, duration: 2, endTime: 10 }
        ]);
      });
    

      it('Test case 3: Processes starting at the same time', () => {
        expect(FCFSProcessSort([
          { name: "P1", start: 0, duration: 4 },
          { name: "P2", start: 0, duration: 2 },
          { name: "P3", start: 0, duration: 3 }
        ])).toStrictEqual([
          { name: "P1", start: 0, duration: 4, endTime: 4 },
          { name: "P2", start: 0, duration: 2, endTime: 6 },
          { name: "P3", start: 0, duration: 3, endTime: 9 }
        ]);
      });
    

      it('Test case 4: Processes with large durations', () => {
        expect(FCFSProcessSort([
          { name: "P1", start: 0, duration: 100 },
          { name: "P2", start: 5, duration: 50 },
          { name: "P3", start: 10, duration: 200 }
        ])).toStrictEqual([
          { name: "P1", start: 0, duration: 100, endTime: 100 },
          { name: "P2", start: 5, duration: 50, endTime: 150 },
          { name: "P3", start: 10, duration: 200, endTime: 350 }
        ]);
      });
    

      it('Test case 5: Processes with mixed start times', () => {
        expect(FCFSProcessSort([
          { name: "P1", start: 3, duration: 4 },
          { name: "P2", start: 0, duration: 5 },
          { name: "P3", start: 1, duration: 2 }
        ])).toStrictEqual([
          { name: "P2", start: 0, duration: 5, endTime: 5 },
          { name: "P3", start: 1, duration: 2, endTime: 7 },
          { name: "P1", start: 3, duration: 4, endTime: 11 }
        ]);
      });
    

      it('Test case 6: Single process', () => {
        expect(FCFSProcessSort([
          { name: "P1", start: 5, duration: 10 }
        ])).toStrictEqual([
          { name: "P1", start: 5, duration: 10, endTime: 15 }
        ]);
      });
    

      it('Test case 7: Processes with identical start and duration times', () => {
        expect(FCFSProcessSort([
          { name: "P1", start: 1, duration: 3 },
          { name: "P2", start: 1, duration: 3 },
          { name: "P3", start: 1, duration: 3 }
        ])).toStrictEqual([
          { name: "P1", start: 1, duration: 3, endTime: 4 },
          { name: "P2", start: 1, duration: 3, endTime: 7 },
          { name: "P3", start: 1, duration: 3, endTime: 10 }
        ]);
      });
    

      it('Test case 8: Processes with zero duration', () => {
        expect(FCFSProcessSort([
          { name: "P1", start: 0, duration: 0 },
          { name: "P2", start: 2, duration: 4 },
          { name: "P3", start: 3, duration: 0 }
        ])).toStrictEqual([
          { name: "P1", start: 0, duration: 0, endTime: 0 },
          { name: "P2", start: 2, duration: 4, endTime: 6 },
          { name: "P3", start: 3, duration: 0, endTime: 6 }
        ]);
      });
    
      
      it('Test case 9: Processes with floating-point durations', () => {
        expect(FCFSProcessSort([
          { name: "P1", start: 0, duration: 2.5 },
          { name: "P2", start: 1, duration: 3.7 },
          { name: "P3", start: 3, duration: 1.2 }
        ])).toStrictEqual([
          { name: "P1", start: 0, duration: 2.5, endTime: 2.5 },
          { name: "P2", start: 1, duration: 3.7, endTime: 6.2 },
          { name: "P3", start: 3, duration: 1.2, endTime: 7.4 }
        ]);
      });
    

      it('Test case 10: Processes with negative start times', () => {
        expect(FCFSProcessSort([
          { name: "P1", start: -3, duration: 5 },
          { name: "P2", start: 0, duration: 2 },
          { name: "P3", start: -1, duration: 4 }
        ])).toStrictEqual([
          { name: "P1", start: -3, duration: 5, endTime: 2 },
          { name: "P3", start: -1, duration: 4, endTime: 6 },
          { name: "P2", start: 0, duration: 2, endTime: 8 }
        ]);
      });


      it('Test case 11: Large input with 20 processes', () => {
        expect(FCFSProcessSort([
          { name: "P1", start: 0, duration: 5 },
          { name: "P2", start: 2, duration: 3 },
          { name: "P3", start: 4, duration: 7 },
          { name: "P4", start: 1, duration: 2 },
          { name: "P5", start: 3, duration: 1 },
          { name: "P6", start: 5, duration: 4 },
          { name: "P7", start: 6, duration: 6 },
          { name: "P8", start: 8, duration: 5 },
          { name: "P9", start: 7, duration: 3 },
          { name: "P10", start: 9, duration: 2 },
          { name: "P11", start: 10, duration: 4 },
          { name: "P12", start: 11, duration: 3 },
          { name: "P13", start: 12, duration: 6 },
          { name: "P14", start: 13, duration: 2 },
          { name: "P15", start: 14, duration: 3 },
          { name: "P16", start: 15, duration: 7 },
          { name: "P17", start: 16, duration: 5 },
          { name: "P18", start: 17, duration: 4 },
          { name: "P19", start: 18, duration: 6 },
          { name: "P20", start: 19, duration: 3 }
        ])).toStrictEqual([
          { name: "P1", start: 0, duration: 5, endTime: 5 },
          { name: "P4", start: 1, duration: 2, endTime: 7 },
          { name: "P2", start: 2, duration: 3, endTime: 10 },
          { name: "P5", start: 3, duration: 1, endTime: 11 },
          { name: "P3", start: 4, duration: 7, endTime: 18 },
          { name: "P6", start: 5, duration: 4, endTime: 22 },
          { name: "P7", start: 6, duration: 6, endTime: 28 },
          { name: "P9", start: 7, duration: 3, endTime: 31 },
          { name: "P8", start: 8, duration: 5, endTime: 36 },
          { name: "P10", start: 9, duration: 2, endTime: 38 },
          { name: "P11", start: 10, duration: 4, endTime: 42 },
          { name: "P12", start: 11, duration: 3, endTime: 45 },
          { name: "P13", start: 12, duration: 6, endTime: 51 },
          { name: "P14", start: 13, duration: 2, endTime: 53 },
          { name: "P15", start: 14, duration: 3, endTime: 56 },
          { name: "P16", start: 15, duration: 7, endTime: 63 },
          { name: "P17", start: 16, duration: 5, endTime: 68 },
          { name: "P18", start: 17, duration: 4, endTime: 72 },
          { name: "P19", start: 18, duration: 6, endTime: 78 },
          { name: "P20", start: 19, duration: 3, endTime: 81 }
        ]);
      });
})