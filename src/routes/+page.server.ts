import { error } from '@sveltejs/kit';
import * as fs from 'fs';
import osu from 'node-os-utils';
import { config } from '$lib/_config';
import { streamable } from 'svelte-streamable';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    // const lines = fs.readFileSync('stats/ips').toString().split('\n');
    // const interfaces: { [key: string]: string } = {};
    // for (const line of lines) {
    //     const tmp = line.split(' ');
    //     interfaces[tmp[2]] = tmp[7];
    // }

    // return {
    //     interfaces: interfaces,
    //     cpu: await osu.cpu.usage(),
    //     mem: (await osu.mem.info()).freeMemPercentage
    // };
    // streamable({
    //     url:
    //         (config.sse_addr || 'http://' + window.location.hostname + ':' + config.sse_port) + '/sse',
    //     event: 'init'
    // }).subscribe(async (value) => {
    //     const data: { [key: string]: any } = (await value) as {};
    //     return data;
    //     // for (const ieeeAddr in sseDevices) {
    //     //     if (ieeeAddr in devices) {
    //     //         updateDevice(ieeeAddr, sseDevices[ieeeAddr]);
    //     //     } else {
    //     //         devices[ieeeAddr] = prepareDevice(sseDevices[ieeeAddr]);
    //     //     }
    //     // }
    //     // console.log(sseDevices);
    // });
}