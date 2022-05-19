import db from "firestore";
import { collection, getDocs } from "firebase/firestore";
import { IOrganisation } from "types/organisation";

export async function getOrganisationList() {
  const result: IOrganisation[] = [];
  const querySnapshot = await getDocs(collection(db, "organisation"));
  querySnapshot.forEach(doc => {
    result.push(doc.data() as IOrganisation);
  });
  return result;
}
