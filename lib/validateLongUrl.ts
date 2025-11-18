export default async function validateLongUrl(url: string): Promise<boolean> {
    // Checks if URL starts with https:// or http://
    if (!url.startsWith("https://") && !url.startsWith("http://")) {
        return false;
    }

    // Checks if there are spaces
    if (url.includes(" ")) {
        return false;
    }

    // Uses the URL constructor from JavaScript to test if the URL is valid
    try {
        new URL(url);

        // Checks if the website is deployed and responds to a request.
        // Includes a timeout of 5 seconds if request is not made in time
        const res = await fetch(url, {
            signal: AbortSignal.timeout(5000),
        });

        return res.ok;
    } catch (err) {
        console.error(err);
        return false;
    }
}