import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';

let startTime: number;

beforeEach(() => {
  startTime = performance.now();
});

afterEach(() => {
  const testName = expect.getState().currentTestName;
  const duration = performance.now() - startTime;
  console.log(`🧪 Finished: ${testName} (${duration.toFixed(2)} ms)`);
  localStorage.clear();
  cleanup();
  vi.clearAllMocks();
});