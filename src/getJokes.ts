import * as vscode from 'vscode';

function getJoke() {
	const jokes = [
		"Why don't scientists trust atoms? Because they make up everything!",
		"Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!",
		'I told my wife she was drawing her eyebrows too high. She looked surprised!',
		"Why don't eggs tell jokes? Because they'd crack each other up!",
		"What do you call a boomerang that doesn't come back? A stick.",
	];

	const randomIndex = Math.floor(Math.random() * jokes.length);
	const randomJoke = jokes[randomIndex];

	const view = vscode.window.createWebviewPanel(
		'getrandomjoke.getJoke.results',
		'Display Joke',
		vscode.ViewColumn.One,
		{
			enableScripts: true,
		}
	);

	if (view) {
		view.webview.html = `
             <!DOCTYPE html>
             <html>
              <body>
               <p>${randomJoke}</p>
              </body>
             </html>
             `;
	}
}

export const jokes = vscode.commands.registerCommand('getrandomjoke.getJoke', async () => {
	try {
		await vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: 'Loading...',
				cancellable: false,
			},
			async progress => {
				getJoke();
				progress.report({ increment: 100 });
			}
		);
	} catch (err: any) {
		vscode.window.showErrorMessage('An error occurred');
	}
});
