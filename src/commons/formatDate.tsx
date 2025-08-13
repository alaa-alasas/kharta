
export const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const pad = (n: number) => (n < 10 ? "0" + n : n);
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
};


export const formatDateToInput = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const pad = (n: number) => (n < 10 ? "0" + n : n);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};