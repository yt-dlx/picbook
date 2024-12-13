// src/app/api/proxy/route.ts
// ==================================== Version 1 ====================================
import { Octokit } from "@octokit/rest";
import { NextRequest, NextResponse } from "next/server";
const repo = process.env.GITHUB_REPO!;
const token = process.env.GITHUB_TOKEN!;
const owner = process.env.GITHUB_OWNER!;
const branch = process.env.GITHUB_BRANCH!;
const octokit = new Octokit({ auth: token });
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get("filename");
  const source = searchParams.get("source");
  try {
    if (!fileName) {
      const { data } = await octokit.repos.getContent({ owner, repo, path: "", ref: branch });
      if (Array.isArray(data)) {
        const filenames = data.map((item) => item.name);
        return new NextResponse(JSON.stringify(filenames), { headers: { "Content-Type": "application/json" } });
      } else throw new Error("Unexpected response format from GitHub API.");
    }
    const { data } = await octokit.repos.getContent({ owner, repo, path: fileName, ref: branch });
    let fileContentBuffer: Buffer;
    if ("content" in data && "encoding" in data && data.content) fileContentBuffer = Buffer.from(data.content, "base64");
    else if ("download_url" in data && data.download_url) {
      const fileResponse = await fetch(data.download_url);
      if (!fileResponse.ok) throw new Error(`Failed to fetch the file from download URL: ${fileName}`);
      const arrayBuffer = await fileResponse.arrayBuffer();
      fileContentBuffer = Buffer.from(arrayBuffer);
    } else throw new Error(`File content is unavailable for file: ${fileName}`);
    if (source === "preview") {
      const mimeType = data.type === "file" ? "application/octet-stream" : "application/octet-stream";
      const base64String = fileContentBuffer.toString("base64");
      const base64Response = `data:${mimeType};base64,${base64String}`;
      return new NextResponse(base64Response, { headers: { "Content-Type": "text/plain" } });
    }
    return new NextResponse(fileContentBuffer, { headers: { "Content-Disposition": `attachment; filename=\"${fileName}\"`, "Content-Type": "application/octet-stream" } });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching file${fileName ? `: ${fileName}` : ""}:`, error);
      return new NextResponse(`Error: ${error.message}`, { status: 500 });
    } else {
      console.error("Unexpected error:", error);
      return new NextResponse("An unexpected error occurred.", { status: 500 });
    }
  }
}