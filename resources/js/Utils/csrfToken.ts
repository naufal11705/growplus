/*export const getCsrfToken = (): string | null => {
    const tokenElement = document.head.querySelector("meta[name='csrf-token']");

    if (tokenElement instanceof HTMLMetaElement) {
        console.log('CSRF Token Ditemukan:', tokenElement.content);
        return tokenElement.content;
    } else {
        console.log('CSRF Token Tidak Ditemukan');
        return null;
    }
};*/

export default function useCsrfToken() {
    return (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "";
}

