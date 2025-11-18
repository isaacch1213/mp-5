export default function validateLongUrl(url: string): boolean {
    // Checks if URL starts with https:// (a secure website)
    if (!url.startsWith("https://")) {
        return false;
    }

    // Checks if there are spaces
    if (url.includes(" ")) {
        return false;
    }

    // Uses the URL constructor from JavaScript to test if the URL is valid
    try {
        new URL(url);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}