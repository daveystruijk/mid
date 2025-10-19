import { App } from '@slack/bolt';
import { config } from './config.js';

const app = new App({
  signingSecret: config.SLACK_SIGNING_SECRET,
  token: config.SLACK_BOT_TOKEN,
  appToken: config.SLACK_APP_TOKEN,
  socketMode: true,
});

app.event('app_mention', async ({ event }) => {
  console.log(event);
});

await app.start();
