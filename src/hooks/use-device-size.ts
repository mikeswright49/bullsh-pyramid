import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
/**
 * Enum for breakpoint values.
 * @readonly
 * @enum {number}
 */
export enum Breakpoint {
    XS = 0,
    SM = 575,
    MD = 768,
    LG = 992,
    XL = 1200,
}

type Handler = () => void;
let handlers: Handler[] = [];

const onResize = () => {
    handlers.forEach((handler) => {
        handler();
    });
};

/**
 *
 * export @function getCurrentBrakpoint(window.innerWidth)
 * @param {number} innerWidth
 *
 * * @example
 * // Get current breakpoint by passing @param {number} innerWidth
 * getCurrentBrakpoint(window.innerWidth);
 * @returns {enum} breakpoint value base on condition from value passed by
 * @param {number} innerWidth
 * getCurrentBrakpoint(window.innerWidth);
 * @param innerWidth — *
 * @param innerWidth — getCurrentBrakpoint(window.innerWidth);
 * @param innerWidth
 */

export function getCurrentBreakPoint(innerWidth: number): Breakpoint {
    if (innerWidth >= Breakpoint.XL) {
        return Breakpoint.XL;
    } else if (innerWidth >= Breakpoint.LG) {
        return Breakpoint.LG;
    } else if (innerWidth >= Breakpoint.MD) {
        return Breakpoint.MD;
    } else if (innerWidth >= Breakpoint.SM) {
        return Breakpoint.SM;
    }
    return Breakpoint.XS;
}

useDeviceSize.debounceDelay = 50;
useDeviceSize.initialized = false;
/**
 * React hook to get user device height, width, and breakpoint
 * @param {object} windowDI
 * @property {number}  innerHeight
 * @property {number}  innerWidth
 * @property {number}  breakpoint
 * @returns {object} innerHeight, innerWidth, breakpoint
 *
 * @example
 *
 * // Get the height, width, or breakpoint for the user device
 * const { height, width, breakpoint } = useDeviceSize();
 *
 * // Use returned object to display component when on designated height , width, or breakpoint
 * {height > 600 ? <Mobile/> : <Desktop/>}
 * {width > 768 ? <Tablet/> : <Desktop/>}
 * {breakpoint > 1200 ? <Desktop/> : <Mobile/>}
 *
 */

// tslint:disable-next-line: completed-docs
export function useDeviceSize(windowDI?: {
    innerHeight: number;
    innerWidth: number;
    addEventListener?: (key: string, callback: Handler) => void;
}): { height: number; width: number; breakpoint: Breakpoint } {
    const display = windowDI || window;
    const [deviceSize, setDeviceSize] = useState(() => ({
        height: display.innerHeight,
        width: display.innerWidth,
        breakpoint: getCurrentBreakPoint(display.innerWidth),
    }));

    useEffect(() => {
        // static singular registration of the useDeviceSize on all platforms
        if (!useDeviceSize.initialized) {
            (display as Window).addEventListener(
                'resize',
                debounce(onResize, useDeviceSize.debounceDelay)
            );
            useDeviceSize.initialized = true;
        }

        const register = (handler: Handler) => {
            handlers.push(handler);
        };

        const unregister = (handler: Handler) => {
            handlers = handlers.filter((existingHandler) => handler !== existingHandler);
        };

        const updateDeviceSize = () => {
            setDeviceSize({
                height: display.innerHeight,
                width: display.innerWidth,
                breakpoint: getCurrentBreakPoint(display.innerWidth),
            });
        };

        register(updateDeviceSize);
        return () => {
            unregister(updateDeviceSize);
        };
    }, []);
    return deviceSize;
}
