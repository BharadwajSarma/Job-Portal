// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
import {nodeProfilingIntegration} from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://adcae408821c715b9e29e2c2b36d896f@o4509424885497856.ingest.us.sentry.io/4509424886808576",
    integrations:[
        nodeProfilingIntegration(),
        Sentry.mongooseIntegration()
    ],
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});