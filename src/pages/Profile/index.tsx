import React from "react";
import { useLocation } from "react-router-dom";
import Header from "components/HeaderProfile";
import ProfileDetail from "components/ProfileDetail";
import { IOrganisation } from "types/organisation";
function Profile() {
  const location = useLocation();
  const organisation = location.state as IOrganisation;
  return (
    <div>
      <Header {...organisation} />
      <ProfileDetail {...organisation} />
    </div>
  );
}

export default Profile;
