import getCollection, { URL_COLLECTION } from "@/db";
import { UrlProps } from "@/types/UrlProps";

export default async function getUrlByAlias(
    alias: string,
): Promise<UrlProps | null> {
    const urlCollection = await getCollection(URL_COLLECTION);
    const data = await urlCollection.findOne({ alias });

    if (data == null) {
        return null;
    }

    const url = {
        id: data._id.toHexString(),
        longUrl: data.longUrl,
        alias: data.alias,
    }

    return url;
}
