//  ==================================================XXX==================================================
//  This Code Is Used To Upload The Final Files To GitHub
//  ==================================================XXX==================================================
import axios from "axios";
import { join } from "path";
import { readFileSync, readdirSync } from "fs";

const owner = "yt-dlx";
const repo = "wallpaper";
const branch = "pixnote_A";
const filesDir = "./sources/pixnote_A";
const commitMessage = "Add multiple files";
const token = "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";
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/`;

async function fetchUploadedFiles() {
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`, { headers: { Authorization: `token ${token}` } });
    if (response.status === 200) {
      const files = response.data.tree;
      const uploadedFileNames = files.map((file) => file.path.split("/").pop());
      console.log(`INFO: Fetched ${uploadedFileNames.length} files from GitHub.`);
      return new Set(uploadedFileNames);
    } else {
      console.error(`ERROR: Failed to fetch repository contents: ${response.status}`);
      return new Set();
    }
  } catch (error) {
    console.error("ERROR: Error fetching uploaded files:", error.message);
    return new Set();
  }
}

async function uploadFileToGitHub(filePath, fileName) {
  const content = readFileSync(filePath, "base64");
  try {
    console.log(`INFO: Uploading file: ${fileName}`);
    const data = { message: commitMessage, content: content, branch: branch };
    const response = await axios.put(`${apiUrl}${fileName}`, data, {
      headers: { Authorization: `token ${token}` }
    });
    if (response.status === 201) console.log(`INFO: File uploaded successfully: ${fileName}`);
    else console.warn(`Unexpected response for ${fileName}: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.error(`ERROR: Error uploading ${fileName}:`, error.message);
  }
}

function sortFiles(files) {
  return files.sort((a, b) => {
    const baseNameA = a.match(/^(.*)\s\((\d+)\)\.\w+$/);
    const baseNameB = b.match(/^(.*)\s\((\d+)\)\.\w+$/);
    if (baseNameA && baseNameB) {
      const [_, nameA, numA] = baseNameA;
      const [__, nameB, numB] = baseNameB;
      if (nameA === nameB) return parseInt(numA) - parseInt(numB);
      return nameA.localeCompare(nameB);
    }
    return a.localeCompare(b);
  });
}

async function uploadFiles() {
  try {
    console.log("INFO: Starting the file upload process...");
    const uploadedFileNames = await fetchUploadedFiles();
    const localFiles = readdirSync(filesDir);
    const filesToUpload = sortFiles(localFiles.filter((file) => !uploadedFileNames.has(file)));
    for (const file of filesToUpload) {
      const filePath = join(filesDir, file);
      await uploadFileToGitHub(filePath, file);
    }
    console.log("INFO: File upload process completed.");
  } catch (error) {
    console.error("ERROR: Error during file upload process:", error.message);
  }
}

uploadFiles()
  .then(() => console.log("INFO: File upload process finished successfully."))
  .catch((error) => console.error("ERROR: Error during file upload process:", error.message));
//  ==================================================XXX==================================================