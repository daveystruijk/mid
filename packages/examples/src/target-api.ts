import { jsonBodyParser, zodBodyParser } from '@mid/core';
import { APIGatewayEvent, Context } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayEvent> =>
  mid({ event, context })
    .use(jsonBodyParser())
    .use(zodBodyParser({ schema: z.object({ roomId: z.number() }) }))
    .use(async ({ event }) => {});
