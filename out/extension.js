'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const diacriticmap_1 = require("./diacriticmap");
function activate(context) {
    let disposable = vscode.commands.registerCommand('remove-diacritics.removeDiacritics', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            var diacriticsMap = {};
            for (var i = 0; i < diacriticmap_1.default.length; i++) {
                var letters = diacriticmap_1.default[i].letters.split("");
                for (var j = 0; j < letters.length; j++) {
                    diacriticsMap[letters[j]] = diacriticmap_1.default[i].base;
                }
            }
            function removeDiacritics(str) {
                return str.replace(/[^A-Za-z0-9\s]/g, function (a) {
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
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map