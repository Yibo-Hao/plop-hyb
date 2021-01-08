#!/usr/bin/env node

'use strict';

const Liftoff = require('liftoff');
const entry = require('./src/entry');

const Hyb = new Liftoff({
    name: 'hyb',
});

Hyb.launch({}, entry);
