'use strict';

import * as vscode from 'vscode';
import defaultDiacriticsMap from './diacriticmap';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('remove-diacritics.removeDiacritics', () => {
		const editor = vscode.window.activeTextEditor;
		
		if (editor) {
			var diacriticsMap: { [key: string]: string } = {};
			for (var i = 0; i < defaultDiacriticsMap.length; i++) {
				var letters = defaultDiacriticsMap[i].letters.split("");
				for (var j = 0; j < letters.length ; j++) {
					diacriticsMap[letters[j]] = defaultDiacriticsMap[i].base;
				}
			}

			function removeDiacritics(str: string) {
				return str.replace(/[^A-Za-z0-9\s]/g, function(a) {
					return diacriticsMap[a] || a;
				});
			}

			const document = editor.document;
			const selection = editor.selection;
			const word = document.getText(selection);
			const cleaned = removeDiacritics(word);
			editor.edit(editBuilder => {
				editBuilder.replace(selection, cleaned);
			});
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
