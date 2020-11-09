import vscode from "vscode";
import { globalStateKeys } from "../src/keys";
import fetch from "node-fetch";

export const issueCommand = (context) =>
  vscode.commands.registerCommand("jinc.inProgressIssues", async function () {
    const url = context.globalState.get(globalStateKeys.URL);
    const apiUsername = context.globalState.get(globalStateKeys.API_USER);
    const apiPassword = context.secrets.get(globalStateKeys.API_PASSWORD);
    const jiraUsername = context.globalState.get(globalStateKeys.USERNAME);

    try {
      const authHeader = Buffer.from(`${apiUsername}:${apiPassword}`).toString(
        "base64"
      );

      const response = await fetch(
        `${url}/rest/api/2/search?jql=assignee=${jiraUsername}&status=Open`,
        { headers: { Authorization: `Basic ${authHeader}` } }
      );
      const data = await response.json();

      const issues = data.issues.map((issue) => {
        if (issue.fields.parent) {
          return {
            key: `${issue.fields.parent.key}/${issue.key}`,
            name: issue.fields.summary,
          };
        }

        return {
          key: `${issue.key}`,
          name: issue.fields.summary,
        };
      });

      const pickedOption = await vscode.window.showQuickPick(
        issues.map((issue) => `${issue.key}: ${issue.name}`)
      );
      
      const pickedOptionKey = pickedOption.split(":")[0];
      
      vscode.env.clipboard.writeText(`${pickedOptionKey}: `)
    } catch (error) {
      console.error(error);
      vscode.window.showInformationMessage(error);
    }
  });
