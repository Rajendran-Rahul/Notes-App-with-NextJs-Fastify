
const api_url = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
const get_note = `${api_url}`;
const create_note = `${api_url}${process.env.NEXT_PUBLIC_POST_NOTES}`;
const update_note = `${api_url}${process.env.NEXT_PUBLIC_UPDATE_NOTE}`;
const delete_note = `${api_url}${process.env.NEXT_PUBLIC_DELETE_NOTE}`;

const fetchData = async<T,> (
  url: string,
  method: string = "GET",
  body?: object,
): Promise<T> => {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(
      `API call failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
};
export { fetchData, get_note, create_note, update_note, delete_note };
