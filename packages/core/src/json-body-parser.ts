import { APIGatewayEvent } from 'aws-lambda';

type Input = {
  event: APIGatewayEvent;
};

type Output = {
  event: Omit<APIGatewayEvent, 'body'> & {
    body: Record<string, unknown>;
  };
};

export const jsonBodyParser =
  () =>
  async <T extends Input>(input: T): Promise<T & Output> => {
    const { event } = input;

    if (!event.body) {
      throw new Error('Request body is empty');
    }

    const json = JSON.parse(event.body);
    return { ...input, event: { ...event, body: json } };
  };
