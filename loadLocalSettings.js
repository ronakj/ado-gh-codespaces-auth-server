const fs = require("fs");

const settings = {
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "GITHUB_APP_CLIENT_ID": process.env.CLIENT_ID_GH_APP,
    "GITHUB_APP_CLIENT_SECRET": process.env.CLIENT_SECRET_GH_APP,
    "REDIRECT_URL": "http://localhost:7071/api/callback"
  },
  "Host": {
    "CORS": "*"
  }
};

fs.writeFileSync("./local.settings.json", JSON.stringify(settings, null, 2));