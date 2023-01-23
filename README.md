# Bridge Device Interface

This repository is part of the LoRaBridge project.
It provides the docker image for web interface used on our bridge device.

Our web interface is a self-provided SvelteKit web application that shows the ZigBee devices, which are retrieved via the SSE server. It enables you to disable unnecessary sensor attributes, in order to further reduce the transmitted data.

## Environment Variables
- `NODE_ENV`: Nodejs Environement
- `VITE_REDIS_CONN_STRING`: Connetion string for redis (default: `redis://redis:6379`)
- `VITE_MQTT_HOST`: IP or hostname of the MQTT host
- `VITE_MQTT_PORT`: Port used by MQTT
 
## Local Development

```bash
npm run dev
# build production version with
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


## Docker Development

### build

```bash
docker build . -t interface
```

### run

```bash
docker run --publish 3000:3000 -d --net="host" interface VITE_REDIS_CONN_STRING=redis://127.0.0.1:6379
```

## License

All the LoRaBridge software components and the documentation are licensed under GNU General Public License 3.0.

## Acknowledgements

The financial support from Internetstiftung/Netidee is gratefully acknowledged. The mission of Netidee is to support development of open-source tools for more accessible and versatile use of the Internet in Austria.
