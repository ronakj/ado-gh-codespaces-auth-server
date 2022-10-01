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

const getHtml = (token: string, adoExtensionOrigin: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <script>
        window.opener.postMessage({ "token": "${token}" }, "${adoExtensionOrigin}")
      </script>
    </head>
    <body>
    Please wait...
    </body>
  </html>
`;

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const token = await oathApp.createToken({
    state: req.query.state as string,
    code: req.query.code as string,
  });

  const origin = JSON.parse(decodeURIComponent(req.query.state)).origin;

  context.res = {
    status: 200,
    body: getHtml(token.authentication.token, origin),
    headers: { "Content-Type": "text/html; charset=UTF-8" },
  } as HttpResponseSimple;
};

export default httpTrigger;
