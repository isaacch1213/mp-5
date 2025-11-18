import getUrlByAlias from "@/lib/getUrlByAlias";
import { redirect } from "next/navigation";

export default async function RedirectURL({
    params
}: {
    params: Promise<{ alias: string}>;
}) {
    const { alias } = await params;
    // redirect() throws an internal error to stop rendering, so need to store it in a variable
    // and update it conditionally
    let redirectPath: string | null = null;

    try {
        const url = await getUrlByAlias(alias);

        if (!url) {
            redirectPath = "/";
        } else {
            redirectPath = url.longUrl;
        }
    } catch (err) {
        console.error(err);
        redirectPath = "/";
    } finally {
        if (redirectPath) {
            redirect(redirectPath);
        }
    }
}
