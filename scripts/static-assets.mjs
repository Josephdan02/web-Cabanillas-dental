export const cmsDirectories = ["admin", "assets", "content"];

export function isPublishedAsset(relativePath) {
  return relativePath !== "assets/uploads" && !relativePath.startsWith("assets/uploads/");
}
