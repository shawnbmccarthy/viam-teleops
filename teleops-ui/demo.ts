// This code must be run in a browser environment.

import { createRobotClient } from '@viamrobotics/sdk';

async function main() {
  const host = 'linux-main.fkpjr1ipv5.viam.cloud';

  const robot = await createRobotClient({
    host,
    credential: {
      type: 'robot-location-secret',
      payload: 'a2f6xt4er3vnro74khilhv23773fduxdkq96te5p1apnskgo',
    },
    authEntity: host,
    signalingAddress: 'https://app.viam.com:443',
  });
  

  console.log('Resources:');
  console.log(await robot.resourceNames());
}

main().catch((error) => {
  console.error('encountered an error:', error)
});
