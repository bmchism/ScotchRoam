#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { loadConfig } from "../lib/config";
import { ScotchStack } from "../lib/scotch-stack";
import { SecurityStack } from "../lib/security-stack";
const app = new cdk.App();
const config = loadConfig(app);
const env = { account: config.account, region: config.region };
new ScotchStack(app, "ScotchStack", { env, config, description: "Scotch Roam app — core" });
if (config.enableSecurityBaseline) { new SecurityStack(app, "ScotchSecurityStack", { env, config, description: "Scotch Roam — account security baseline" }); }
app.synth();
