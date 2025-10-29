import { mid } from '@mid/core';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  // Invoke mid
  return mid(event, context);
};
