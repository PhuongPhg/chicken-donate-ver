import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Header from 'components/HeaderProfile';
import ProfileDetail from 'components/ProfileDetail';
import { IOrganisation } from 'types/organisation';
import { getOrganization } from 'service';

function Profile() {
  const location = useLocation();
  const params = useParams();
  const [organization, setOrganization] = useState<IOrganisation>();

  const getOrganizationInfo = useCallback(async () => {
    const data = (await getOrganization(params.addressId || '')) as IOrganisation;
    setOrganization(data);
  }, [params]);

  useEffect(() => {
    if (!!(location.state as IOrganisation)?.addressId) {
      setOrganization(location.state as IOrganisation);
    } else {
      getOrganizationInfo();
    }
  }, [getOrganizationInfo, location.state]);

  return (
    <div>
      <Header {...(organization as IOrganisation)} />
      <ProfileDetail {...(organization as IOrganisation)} />
    </div>
  );
}

export default Profile;
