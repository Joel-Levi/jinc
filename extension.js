// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import vscode from "vscode";
import { issueCommand } from "./commands/inProgressIssues";
import { setupCommand } from "./commands/setup";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log("Please use the jinc.setup command!");
  context.subscriptions.push(setupCommand(context));
  context.subscriptions.push(issueCommand(context));

  sayHello();
}
exports.activate = activate;
function sayHello() {
  vscode.window.showInformationMessage("Hello World!");
}
// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
