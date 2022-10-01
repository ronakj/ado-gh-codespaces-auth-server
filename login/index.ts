import {
  AzureFunction,
  Context,
  HttpRequest,
  HttpResponseSimple,
} from "@azure/functions";
import { OAuthApp } from "@octokit/oauth-app";

const oathApp = new OAuthApp({
  clientId: process.env.GITHUB_APP_CLIENT_ID,
  clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
  clientType: "github-app",
});

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const result = await oathApp.getWebFlowAuthorizationUrl({
    state: req.query.state,
    allowSignup: req.query.allowSignup === "true" ? true : false,
    redirectUrl: process.env.REDIRECT_URL,
    login: req.query.login,
  });

  context.res = {
    status: 302,
    headers: {
      location: result.url,
    },
  } as HttpResponseSimple;
};

export default httpTrigger;
