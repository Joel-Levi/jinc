import type { ExtensionContext } from "vscode";

import * as vscode from 'vscode'
import { globalStateKeys } from "../src/keys";

export const changeUsernameCommand = (context : ExtensionContext) =>
	vscode.commands.registerCommand("jinc.changeUsername", async function () {
		const username = await vscode.window.showInputBox({
			prompt: "Jira username to get open issues for?",
		});
		
		if (!username) {
			vscode.window.showInformationMessage(
				"Username change cancelled"
			);
			return;
		}
	
		context.globalState.update(globalStateKeys.USERNAME, username);
		
		vscode.window.showInformationMessage(
			"Username changed"
		);
	});
