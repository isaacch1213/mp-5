"use server"

import getCollection, { URL_COLLECTION } from "@/db";
import { UrlProps } from "@/types/UrlProps";
import validateLongUrl from "./validateLongUrl";

export default async function createNewUrl(
    longUrl: string,
    alias: string,
): Promise<{ error?: string; id?: string; alias?: string }> {
    console.log("Creating new URL");

    // Updated all error return statements to be an object, as Next.js does not render
    // error statements

    // Checks if URL is valid
    if (!validateLongUrl(longUrl)) {
        return { error: "Invalid URL. Must start with https:// or http://, be a valid website, and contain no spaces." };
    }

    // Checks if alias is valid
    if (alias.includes(" ")) {
        return { error: "Alias cannot contain spaces" };
    }

    // Checks for characters that are not safe in a URL path segment
    if (encodeURIComponent(alias) !== alias) {
        return { error: "Invalid alias: You may only use valid URL characters." };
    }

    const urlCollection = await getCollection(URL_COLLECTION);

    // Checks if alias already exists
    const isExisting = await urlCollection.findOne({ alias });
    if (isExisting) {
        return { error: "Alias already exists. Create a different one." }
    }

    // insert to DB
    const url = {
        longUrl: longUrl,
        alias: alias,
    }

    const res = await urlCollection.insertOne({...url});

    if (!res.acknowledged) {
        return { error: "DB insert failed" };
    }

    return { ...url, id: res.insertedId.toHexString() };
}
