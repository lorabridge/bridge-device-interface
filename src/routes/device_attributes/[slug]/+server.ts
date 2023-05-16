import { json as json$1 } from '@sveltejs/kit';
import { client, PREFIX } from '$lib/_redis';

export async function GET({ params }) {
	const { slug } = params;
	const value = await client.lRange(PREFIX + slug, 0, -1);

	if (value) {
		// https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701
		return json$1(value);
	}

	return new Response(undefined, { status: 404 });
}

export async function POST({ params, request }) {
	const { slug } = params;
	const data = await request.json();

	await client.lTrim(PREFIX + slug, -1, 0);
	console.log(data);
	await client.lPush(PREFIX + slug, data);

	return new Response(undefined);
}
