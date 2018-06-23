'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "cmp-doc" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        //vscode.window.showInformationMessage('Hello World!');

        let editor = vscode.window.activeTextEditor;
        if(!editor) {
            return;
        }

        const baseUrl = 'https://developer.salesforce.com/docs/component-library';
        
        //simple validation
        //TODO: needs to do validation to ensure the text is valid and can handle proper tags
        const isLightingNamespace = (str : string) => str.includes('lightning:');
        const isAuraNameSpace = (str : string) =>  str.includes('aura:');
        const textIsEntered = (str : string) => str.length > 0;        
        const isValidComponentTag = (str : string) => textIsEntered(str) && (isLightingNamespace(str) || isAuraNameSpace(str));                 
        const buildCmpUrl = (cmpTag : string) => baseUrl + `/bundle/${cmpTag}/example`;
        const openInBrowser = (docUrl : string) => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(docUrl));
        const logMessage = (msg : string) => vscode.window.showInformationMessage('text to match is: ' + msg);
        
        let selection = editor.selection;
        let text = editor.document.getText(selection);
        const docUrl = isValidComponentTag(text) ? buildCmpUrl(text) : baseUrl;
        openInBrowser(docUrl);
        logMessage(text);
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}