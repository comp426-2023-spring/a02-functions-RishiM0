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

if (args.z){
    timezone = args.z;
}

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

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&timezone='+ timezone);
const data = await response.json();

const days = args.d;

let need_galoshes = '';
if (response.daily_precipitation_hours[days] > 1){
    need_galoghes = response.daily_precipitation_hours[days] + 'is expected, you will need galoshes ';
} else {
    need_galoshes = response.daily_precipitation_hours[days] + 'is expected, you will not need galoshes ';
}

if (days == 0) {
  console.log( need_galoshes + "today.")
} else if (days > 1) {
  console.log( need_galoshes + "in " + days + " days.")
} else {
  console.log( need_galoshes + "tomorrow.")
}

if (args.j) {
    console.log(data);
    process.exit(0);
}



