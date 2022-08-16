import type { ExtensionContext } from "vscode";

import * as vscode from 'vscode'
import { globalStateKeys } from "../src/keys";

export const copyLastUsedCommand = (context : ExtensionContext) =>
	vscode.commands.registerCommand("jinc.copyLastUsed", async function () {
		const lastUsedValue = context.globalState.get<string>(globalStateKeys.LAST_USED_VALUE);
		await vscode.env.clipboard.writeText(lastUsedValue);
	});
