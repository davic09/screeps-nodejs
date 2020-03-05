"use strict";

import clear from "rollup-plugin-clear";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import buble from 'rollup-plugin-buble';
import multiEntry from 'rollup-plugin-multi-entry';
import nodent from 'rollup-plugin-nodent';

export default {
    input: 'test/integration/**/*.test.js',
    output: {
        file: 'dist/test-integration.bundle.js',
        name: 'lib',
        sourcemap: true,
        format: 'iife',
        globals: {
            chai: 'chai',
            it: 'it',
            describe: 'describe'
        }
    },
    external: ['chai', 'it', 'describe'],
    plugins: [
        clear({ targets: ["dist/test.bundle.js"] }),
        resolve(),
        commonjs(),
        nodent(),
        multiEntry(),
        buble()
    ]
}