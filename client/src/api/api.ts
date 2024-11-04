import { Group } from "../types/apiTypes";

export async function getAllGroupData(): Promise<[Group]> {
  const res = await fetch("http://localhost:5000/api/group/");
  if (!res.ok) {
    throw new Error("Couldn't fetch all group data");
  }
  return res.json();
}
