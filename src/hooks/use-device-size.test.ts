import { renderHook, act } from '@testing-library/react-hooks';
import { Breakpoint, useDeviceSize } from './use-device-size';
jest.useFakeTimers();
const runBreakpointTest = async (innerWidth: number, expectedValue: number) => {
    const { result } = renderHook(() =>
        useDeviceSize({ innerWidth, innerHeight: 768, addEventListener: jest.fn() })
    );
    await act(async () => {
        global.dispatchEvent(new Event('resize'));
        jest.runAllTimers();
    });
    expect(Breakpoint[result.current.breakpoint]).toBe(expectedValue);
};
describe('<Unit Test> use breakpoint hook', () => {
    const testCases = [];
    Object.keys(Breakpoint).forEach((key) => {
        if (!isNaN(+key)) {
            testCases.push([+key, Breakpoint[key]]);
            testCases.push([+key + 1, Breakpoint[key]]);
        }
    });
    test.each(testCases)(
        'it should be able to handle the width: %d, breakpoint: %s',
        async (width, breakpoint) => {
            await runBreakpointTest(width, breakpoint);
        }
    );
});
