import vscode from "vscode";
import { globalStateKeys } from "../src/keys";

export const setupCommand = (context) =>
  vscode.commands.registerCommand("jinc.setup", async function () {
    // The code you place here will be executed every time your command is executed
    const url = await vscode.window.showInputBox({
      prompt: "Jira URL?",
    });
    const apiUser = await vscode.window.showInputBox({
      prompt: "Jira Api user",
    });
    const apiPassword = await vscode.window.showInputBox({
      prompt: "Jira Api password? (Stored using vscode secrets)",
      password: true,
    });
    const username = await vscode.window.showInputBox({
      prompt: "Jira username to get issues for?",
    });
	
    context.globalState.update(globalStateKeys.URL, url);
    context.globalState.update(globalStateKeys.USERNAME, username);
    context.globalState.update(globalStateKeys.API_USER, apiUser);
    const secrets = context["secrets"];
    await secrets.store(globalStateKeys.API_PASSWORD, apiPassword);
    
    vscode.window.showInformationMessage(
      "JINC Setup complete. Run JINC.getIssue"
    );
  });
