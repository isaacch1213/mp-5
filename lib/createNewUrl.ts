import getCollection, { URL_COLLECTION } from "@/db";
import { UrlProps } from "@/types/UrlProps";
import validateLongUrl from "./validateLongUrl";

export default async function createNewUrl(
    longUrl: string,
    alias: string,
): Promise<UrlProps> {
    console.log("Creating new URL");

    // Checks if URL is valid
    if (!validateLongUrl(longUrl)) {
        throw new Error("Invalid URL. Must start with https://, be a valid website, and contain no spaces.");
    }

    // Checks if alias is valid
    if (alias.includes(" ")) {
        throw new Error("Alias cannot contain spaces");
    }

    const urlCollection = await getCollection(URL_COLLECTION);

    // Checks if alias already exists
    const isExisting = await urlCollection.findOne({ alias });
    if (isExisting) {
        throw new Error("Alias already exists. Create a different one.")
    }

    // insert to DB
    const url = {
        longUrl: longUrl,
        alias: alias,
    }

    const res = await urlCollection.insertOne({...url});

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    return { ...url, id: res.insertedId.toHexString() };
}
