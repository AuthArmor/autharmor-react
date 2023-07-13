export function ensureSuccessCode(response: Response): void {
    if (response.ok || response.redirected) {
        return;
    }

    console.error(`Fetch error`, response);
    throw new Error(`Fetch response not OK.`);
}
