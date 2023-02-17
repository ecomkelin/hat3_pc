import localforage from "localforage";

export default async (Auth) => {
    await localforage.setItem("Auth", Auth);

}