import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import db from "firestore";
import { IDonor } from "types/donor";
import { IOrganisation } from "types/organisation";

export async function getOrganisationList() {
  const result: IOrganisation[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "organisation"));
    querySnapshot.forEach(doc => {
      result.push(doc.data() as IOrganisation);
    });
    // TODO: enable when deploy contract
    // const organizationFromBlockchain = await getAllOrganizations()
    // return result.filter(o => (organizationFromBlockchain || []).includes(o.contractAddress));
    return result
  } catch (error) {
    console.log("get list organization", error);
    return [];
  }
}

export async function saveOrganization(organization: IOrganisation) {
  const docRef = doc(db, "organisation", organization.addressId);
  try {
    await setDoc(docRef, organization);
  } catch (error) {
    console.log("create organization", error);
  }
}

export async function saveDonor(donor: IDonor) {
  const docRef = doc(db, "donor", donor.address);
  try {
    const dnor = await getDoc(docRef);
    if (dnor.exists()) return;
    await setDoc(docRef, donor);
  } catch (error) {
    console.log("save donor", error);
  }
}

export async function getDonor(address: string) {
  try {
    const docRef = doc(db, "donor", address);
    const donor = await getDoc(docRef);
    if (donor.exists()) return donor.data();
    return undefined;
  } catch (error) {
    console.log("get donor", error);
  }
}
