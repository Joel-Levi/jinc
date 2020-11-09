import vscode from 'vscode';

export const promtLogin = vscode.commands.registerCommand('jinc.setup', function () {
	vscode.window.showInputBox({prompt : "Jira username?"}).then((username) => {
		vscode.window.showInformationMessage(`username is ${username}`);
	});
})