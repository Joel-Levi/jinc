import type { ExtensionContext } from "vscode"
import { issueCommand } from "./commands/openIssues";
import { setupCommand } from "./commands/setup";
import { changeUsernameCommand } from "./commands/changeUsername";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context: ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log("Please use the jinc.setup command!");
  context.subscriptions.push(setupCommand(context));
  context.subscriptions.push(changeUsernameCommand(context));
  context.subscriptions.push(issueCommand(context));
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
