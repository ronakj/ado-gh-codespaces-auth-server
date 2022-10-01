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
  try {
    await oathApp.deleteToken({
      token: req.body.token,
    });
    context.res = {
      status: 204,
    } as HttpResponseSimple;
  } catch (err) {
    console.error(req, err);
    context.res = {
      status: 400,
      body: {
        error: "invalid requst",
      },
    } as HttpResponseSimple;
  }
};

export default httpTrigger;
