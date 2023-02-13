#!/usr/bin/env node

import minimist from "minimist";
import fetch from "node-fetch";
import moment from "moment-timezone";


const args = minimist(process.argv.slice(2));

if (args.h) {
    console.log( -- "Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
    console.log( -- "\n");
    console.log( -- "-h            Show this help message and exit.\n");
    console.log( -- "-n, -s        Latitude: N positive; S negative.\n");
    console.log( -- "-e, -w        Longitude: E positive; W negative.\n");
    console.log( -- "-z            Time zone: uses tz.guess() from moment-timezone by default.\n");
    console.log( -- "-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n");
    console.log( -- "-j            Echo pretty JSON from open-meteo API and exit.\n");
    process.exit(0);
}

const timezone = moment.tz.guess();

let longitude;
let latitude;

if (args.n) {
    latitude = args.n;
} else if (args.s) {
    latitude = -(args.s);
}

if (args.e) {
    longitude = args.e;
} else if (args.w) {
    longitude = -(args.w);
}

