import localforage from "localforage";
export default async () => {
    await localforage.removeItem("Auth");
}