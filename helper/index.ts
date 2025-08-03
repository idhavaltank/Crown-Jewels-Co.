// Utility function to check if a given URL points to a valid image resource
export const isValidImageUrl = async ({ url }: { url: string }) => {
  try {
    // Perform a HEAD request to the URL to check for resource existence and type
    const response = await fetch(url, { method: "HEAD" });

    // Retrieve the Content-Type header from the response
    const contentType = response.headers.get("content-type") || "";

    // Return true if response is OK and Content-Type indicates an image
    return response.ok && contentType.startsWith("image/");
  } catch (error) {
    // On any fetch or network error, return false indicating invalid image URL
    return false;
  }
};
