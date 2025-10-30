import { APIGatewayProxyResult } from 'aws-lambda';

type Input = {
  response: Record<string, unknown>;
};

type Output = APIGatewayProxyResult;

export const stringifyBody =
  () =>
  async <T extends Input>(input: T): Promise<Output> => {
    const { response } = input;
    return { statusCode: 200, body: JSON.stringify(response) };
  };
