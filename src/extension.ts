import * as vscode from 'vscode';
import { jokes } from './getJokes';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(jokes);
}
