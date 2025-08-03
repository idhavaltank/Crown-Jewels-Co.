export const isValidImageUrl = async ({ url }: { url: string }) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("content-type") || "";
    return response.ok && contentType.startsWith("image/");
  } catch (error) {
    return false;
  }
};
