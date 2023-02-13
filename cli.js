#!/usr/bin/env node

import minimist from "minimist";
import fetch from "node-fetch";
import moment from "moment-timezone";


const args = minimist(process.argv.slice(2));

if (args.h) {
    console.log( "Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
    console.log("\n");
    console.log("-h            Show this help message and exit.\n");
    console.log("-n, -s        Latitude: N positive; S negative.\n");
    console.log("-e, -w        Longitude: E positive; W negative.\n");
    console.log("-z            Time zone: uses tz.guess() from moment-timezone by default.\n");
    console.log("-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n");
    console.log("-j            Echo pretty JSON from open-meteo API and exit.\n");
    process.exit(0);
}

const timezone1 = moment.tz.guess();
let timezone;

if (args.z){
    timezone = args.z;
} else {
    timezone = timezone1;
}

let longitude;
let latitude;

if (args.n) {
    latitude = args.n;
} else if (args.s) {
    latitude = -(args.s);
} else if (!latitude){
    console.log("Latitude must be in range");
    process.exit(0);
}

if (args.e) {
    longitude = args.e;
} else if (args.w) {
    longitude = -(args.w);
} else if (!longitude){
    console.log("Longitude must be in range");
    process.exit(0);
}

const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&timezone=" + timezone + "&daily=precipitation_hours");
const data = await response.json();

let days = args.d;
//if (args.d){//
//    days = args.d;
//}

//let need_galoshes = data.daily.precipitation_hours[days];
//if (data.daily.precipitation_hours[days] > 1.0){
//    need_galoghes = data.daily.precipitation_hours[days] + ' is expected, you will need galoshes ';
//} else {
//    need_galoshes = data.daily.precipitation_hours[days] + ' is expected, you will not need galoshes ';
//}

if (days == 0) {
  console.log( data.daily.precipitation_hours[0] + " " +  "today.");
} else if (days > 1) {
    console.log( data.daily.precipitation_hours[days] + " " + "in " + days + " days.");
} else {
    console.log( data.daily.precipitation_hours[1] + " " +  "tomorrow.");
}

if (args.j) {
    console.log(data);
    process.exit(0);
}



