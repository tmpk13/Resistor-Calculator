const COLORS = {
    digit: [
        { name:'black',    hex:'#1A1A1A', digit:0 },
        { name:'brown',    hex:'#964B00', digit:1 },
        { name:'red',        hex:'#CC0000', digit:2 },
        { name:'orange', hex:'#FF8000', digit:3 },
        { name:'yellow', hex:'#FFE600', digit:4 },
        { name:'green',    hex:'#008800', digit:5 },
        { name:'blue',     hex:'#0033CC', digit:6 },
        { name:'violet', hex:'#8800AA', digit:7 },
        { name:'gray',     hex:'#888888', digit:8 },
        { name:'white',    hex:'#EEEEEE', digit:9 },
    ],
    multiplier: [
        { name:'black',    hex:'#1A1A1A', mult:1 },
        { name:'brown',    hex:'#964B00', mult:10 },
        { name:'red',        hex:'#CC0000', mult:100 },
        { name:'orange', hex:'#FF8000', mult:1e3 },
        { name:'yellow', hex:'#FFE600', mult:1e4 },
        { name:'green',    hex:'#008800', mult:1e5 },
        { name:'blue',     hex:'#0033CC', mult:1e6 },
        { name:'violet', hex:'#8800AA', mult:1e7 },
        { name:'gray',     hex:'#888888', mult:1e8 },
        { name:'white',    hex:'#EEEEEE', mult:1e9 },
        { name:'gold',     hex:'#D4AF37', mult:0.1 },
        { name:'silver', hex:'#B0B0B0', mult:0.01 },
    ],
    tolerance: [
        { name:'brown',    hex:'#964B00', tol:'±1%' },
        { name:'red',        hex:'#CC0000', tol:'±2%' },
        { name:'green',    hex:'#008800', tol:'±0.5%' },
        { name:'blue',     hex:'#0033CC', tol:'±0.25%' },
        { name:'violet', hex:'#8800AA', tol:'±0.1%' },
        { name:'gray',     hex:'#888888', tol:'±0.05%' },
        { name:'gold',     hex:'#D4AF37', tol:'±5%' },
        { name:'silver', hex:'#B0B0B0', tol:'±10%' },
    ]
};

function trimNumber(x) {
    // Drop trailing zeros only after a decimal point so "100" stays "100".
    return x.toPrecision(3).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
}

function formatOhms(ohms) {
    if (ohms >= 1e9)    return trimNumber(ohms/1e9) + ' G\u03A9';
    if (ohms >= 1e6)    return trimNumber(ohms/1e6) + ' M\u03A9';
    if (ohms >= 1e3)    return trimNumber(ohms/1e3) + ' k\u03A9';
    return trimNumber(ohms) + ' \u03A9';
}

function resistance(d1, d2, mult) {
    return (d1 * 10 + d2) * mult;
}

if (typeof module !== 'undefined') {
    module.exports = { COLORS, formatOhms, resistance };
}
