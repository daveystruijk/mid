import { jsonBodyParser, stringifyBody, zodBodyParser } from '@mid/core';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { z } from 'zod';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> =>
  Promise.resolve({ event, context })
    .then(jsonBodyParser())
    .then(zodBodyParser({ schema: z.object({ roomId: z.number() }) }))
    .then(async ({ event }) => {
      console.log(event);
      return {
        response: { ...event, message: `Updated ${event.body.roomId}` },
      };
    })
    .then(stringifyBody())
    .catch((e) => ({ statusCode: 500, body: JSON.stringify(e.message) }));

const result = await handler(
  {
    headers: { Authorization: 'Bearer abcdef' },
    body: JSON.stringify({ roomId: 123, user: 1 }),
  } as Partial<APIGatewayEvent> as APIGatewayEvent,
  {} as Context,
);

console.log(result);
