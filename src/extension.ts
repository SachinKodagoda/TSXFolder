import * as vscode from "vscode";
const fs = require("fs");
const path = require("path");

export function activate(context: vscode.ExtensionContext) {
  console.log("TSX Folder is active");
  let disposable = vscode.commands.registerCommand(
    "tsxfolder.addAComponent",
    async () => {
      vscode.window.showInformationMessage("Hello World from ttt!");
      let editor = vscode.window.activeTextEditor;
      console.log("hi");
      if (editor) {
        let document = editor.document;
        let dir = path.dirname(document.fileName);
        let filePath = path.join(dir, "newFile.txt");
        console.log(dir);

        try {
          // Check if file exists
          await fs.promises.access(filePath, fs.constants.F_OK);
          // If no error, it means the file exists. Notify the user
          vscode.window.showErrorMessage("File already exists");
        } catch (err) {
          // File doesn't exist. Create it.
          fs.promises
            .writeFile(filePath, "")
            .then(() => vscode.window.showInformationMessage("File created"))
            .catch(() =>
              vscode.window.showErrorMessage("Failed to create file")
            );
        }
      }
    }
  );
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
