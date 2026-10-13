import { describe, expect, test } from 'bun:test';
const { COLORS, formatOhms, resistance } = require('./resistor.js');

const digit = name => COLORS.digit.find(c => c.name === name).digit;
const mult = name => COLORS.multiplier.find(c => c.name === name).mult;

describe('resistance', () => {
    test.each([
        ['brown', 'black', 'black', 10],
        ['brown', 'black', 'brown', 100],
        ['red', 'red', 'brown', 220],
        ['yellow', 'violet', 'red', 4700],
        ['brown', 'red', 'orange', 12000],
        ['brown', 'black', 'yellow', 100000],
        ['blue', 'gray', 'green', 6.8e6],
        ['brown', 'black', 'violet', 100e6],
        ['yellow', 'violet', 'gold', 4.7],
        ['yellow', 'violet', 'silver', 0.47],
    ])('%s %s %s = %d', (a, b, m, expected) => {
        expect(resistance(digit(a), digit(b), mult(m))).toBeCloseTo(expected, 9);
    });
});

describe('formatOhms', () => {
    test.each([
        [0, '0 Ω'],
        [0.47, '0.47 Ω'],
        [4.7, '4.7 Ω'],
        [10, '10 Ω'],
        [100, '100 Ω'],
        [120, '120 Ω'],
        [220, '220 Ω'],
        [1000, '1 kΩ'],
        [4700, '4.7 kΩ'],
        [10000, '10 kΩ'],
        [100000, '100 kΩ'],
        [220000, '220 kΩ'],
        [1e6, '1 MΩ'],
        [100e6, '100 MΩ'],
        [1e9, '1 GΩ'],
        [99e9, '99 GΩ'],
    ])('%d -> %s', (ohms, expected) => {
        expect(formatOhms(ohms)).toBe(expected);
    });

    test('every multiplier label round-trips its value', () => {
        for (const c of COLORS.multiplier) {
            const [num, unit] = formatOhms(c.mult).split(' ');
            const scale = { 'Ω': 1, 'kΩ': 1e3, 'MΩ': 1e6, 'GΩ': 1e9 }[unit];
            expect(parseFloat(num) * scale).toBeCloseTo(c.mult, 9);
        }
    });
});
