import inquirer from "inquirer";
import inquirerFileTreeSelection from "inquirer-file-tree-selection-prompt";
import upload from "./lib/upload";

inquirer.registerPrompt("file-tree-selection", inquirerFileTreeSelection);

function cli() {
  inquirer
    .prompt([
      { type: "input", name: "mapboxUsername", message: "Mapbox Username" },
      { type: "input", name: "mapboxToken", message: "Mapbox Token" },
      { type: "file-tree-selection", name: "filePath", message: "Select your Tileset File (.tiff or other file type)" },
      { type: "input", name: "tilesetName", message: "Tileset Name" },
    ])
    .then(async (answers) => {
      await upload(answers);
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Could not load prompt!");
      } else {
        console.log(`Error: ${error}`);
      }
    });
}

cli();
