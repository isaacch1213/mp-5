export default function validateLongUrl(url: string): boolean {
    // Checks if URL starts with https:// or http://
    if (!url.startsWith("https://") && !url.startsWith("http://")) {
        return false;
    }

    // Checks if there are spaces
    if (url.includes(" ")) {
        return false;
    }

    // Checks for characters that are not safe inside a URL
    if (encodeURIComponent(url) !== url) {
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