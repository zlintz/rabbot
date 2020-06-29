## Logging

As of v2, logging uses [bole](https://github.com/rvagg/bole) because it defaults to machine parsable logs,
which are minimalistic and easy to write stream adapters for.

A DEBUG adapter that works just like before is already included in foo-foo-mq,
so you can still prefix the service with `DEBUG=rabbot.*` to get foo-foo-mq specific output.

> Note: `rabbot.queue.*` and `rabbot.exchange.*` are high volume namespaces
> since that is where all published and subscribed messages get reported.

### Attaching Custom Loggers

A log call is now exposed directly to make it easier to attach streams to the bole instance:

```javascript
const rabbit = require( "foo-foo-mq" );

// works like bole's output call
rabbit.log( [
  { level: "info", stream: process.stdout },
  { level: "debug", stream: fs.createWriteStream( "./debug.log" ), objectMode: true }
] );
```
