#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { loadConfig } from "../lib/config";
import { BourbonStack } from "../lib/bourbon-stack";
import { SecurityStack } from "../lib/security-stack";

const app = new cdk.App();
const config = loadConfig(app);
const env = { account: config.account, region: config.region };

new BourbonStack(app, "BourbonStack", { env, config, description: "Bourbon Roam app — core" });

if (config.enableSecurityBaseline) {
  new SecurityStack(app, "BourbonSecurityStack", {
    env, config, description: "Bourbon Roam — account security baseline",
  });
}

app.synth();
