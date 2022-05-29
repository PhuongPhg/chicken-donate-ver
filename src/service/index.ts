import db from 'firestore';
import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { IOrganisation } from 'types/organisation';
import { IDonor } from 'types/donor';

export async function getOrganisationList() {
  const result: IOrganisation[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'organisation'));
    querySnapshot.forEach(doc => {
      result.push(doc.data() as IOrganisation);
    });
    return result;
  } catch (error) {
    console.log('get list organization', error);
    return [];
  }
}

export async function saveOrganization(organization: IOrganisation) {
  const docRef = doc(db, 'organisation', organization.addressId);
  try {
    await setDoc(docRef, organization);
  } catch (error) {
    console.log('create organization', error);
  }
}

export async function saveDonor(donor: IDonor) {
  const docRef = doc(db, 'donor', donor.address);
  try {
    await setDoc(docRef, donor);
  } catch (error) {
    console.log('save donor', error);
  }
}

export async function getDonor(address: string) {
  try {
    const docRef = doc(db, 'donor', address);
    const donor = await getDoc(docRef);
    if (donor.exists()) return donor.data() as IDonor;
    return undefined;
  } catch (error) {
    console.log('get donor', error);
  }
}
export const getOrganization = async (addressId: string) => {
  try {
    const docRef = doc(db, 'organisation', addressId);
    const organization = await getDoc(docRef);
    if (organization.exists()) return organization.data() as IOrganisation;
    return undefined;
  } catch (error) {
    console.log('getOrganization', error);
  }
};
