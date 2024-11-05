import { Collection, Group } from "../types/apiTypes";

export async function getAllGroupData(): Promise<Group[]> {
  const res = await fetch("http://localhost:5000/api/group/");
  if (!res.ok) {
    throw new Error("Couldn't fetch all group data");
  }
  return res.json();
}

export async function getAllCollectionData(): Promise<Collection[]> {
  const res = await fetch("http://localhost:5000/api/collection/");
  if (!res.ok) {
    throw new Error("Couldn't fetch all collection data");
  }
  return res.json();
}
