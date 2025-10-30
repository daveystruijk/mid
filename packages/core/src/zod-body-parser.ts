import { APIGatewayEvent } from 'aws-lambda';
import { z, ZodType } from 'zod';

type Input = {
  event: Omit<APIGatewayEvent, 'body'> & {
    body: Record<string, unknown>;
  };
};

type Output<Schema extends ZodType> = {
  event: Omit<APIGatewayEvent, 'body'> & {
    body: z.infer<Schema>;
  };
};

export const zodBodyParser =
  <Schema extends ZodType>({ schema }: { schema: Schema }) =>
  async <T extends Input>(input: T): Promise<T & Output<Schema>> => {
    const { event } = input;

    const body = schema.parse(event.body);

    return { ...input, event: { ...event, body } };
  };
