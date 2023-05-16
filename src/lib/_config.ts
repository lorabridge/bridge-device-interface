export const vars = {
	sse_addr: import.meta.env.VITE_SSE_ADDR,
	redis_conn_string: import.meta.env.VITE_REDIS_CONN_STRING || 'redis://127.0.0.1:6379',
	sse_port: '8080',
	mqtt_host: import.meta.env.VITE_MQTT_HOST || '127.0.0.1',
	mqtt_port: import.meta.env.VITE_MQTT_PORT || 1883
};
export const config = vars;
