import type { ExtensionContext } from "vscode";

import * as vscode from 'vscode'
import { globalStateKeys } from "../src/keys";
import fetch from "node-fetch";

type Issue = {
	key: string,
	fields: {
		summary: string,
		parent: {
			key: string
		}
	}
}

export const issueCommand = (context: ExtensionContext) =>
	vscode.commands.registerCommand("jinc.inProgressIssues", async function () {
		const url = context.globalState.get<string>(globalStateKeys.URL);
		const apiUsername = context.globalState.get<string>(globalStateKeys.API_USER);
		const jiraUsername = context.globalState.get<string>(globalStateKeys.USERNAME);
		const apiPassword = await context.secrets.get(globalStateKeys.API_PASSWORD);

		try {
			const authHeader = Buffer.from(`${apiUsername}:${apiPassword}`).toString(
				"base64"
			);

			const response = await fetch(
				`${url}/rest/api/2/search?jql=assignee=${jiraUsername} and (status="In progress" or status="In Testing" or status="In Review" or status="Open" or status="Reopened")&fields=summary,parent`,
				{ headers: { Authorization: `Basic ${authHeader}` } }
			);
			const data = await response.json() as unknown as { issues: Issue[] };

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
			
			if (!issues.length) {
				throw new Error('No issues found! You can go on vacation!')
			}
	
			const pickedOption = await vscode.window.showQuickPick(
				issues.map((issue) => `${issue.key}: ${issue.name}`),
				{ title: `Issues found for ${jiraUsername}` }
			);
				
			if (!pickedOption) {
				throw new Error('Something went wrong with getting your selection.')
			}
			
			const pickedOptionKey = pickedOption.split(":")[0];
			await vscode.env.clipboard.writeText(`${pickedOptionKey}: `)
			context.globalState.update(globalStateKeys.LAST_USED_VALUE, `${pickedOptionKey}: `);
		} catch (error) {
			console.error(error);
			vscode.window.showInformationMessage(error.message);
		}
	});
