import { createClient } from 'redis';
import { config } from '$lib/_config';

const PREFIX = "lorabridge:attributes:";
const client = createClient({ url: config.redis_conn_string });
client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

export { client, PREFIX }; 