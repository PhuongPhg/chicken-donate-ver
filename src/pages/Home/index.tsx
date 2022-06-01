import React, { useEffect, useState } from 'react';
import classes from './style.module.scss';
import Intro from 'components/Intro';
import CardItem from 'components/CardItem';
import CategoryFilter from 'components/CategoryFilter';
import InputPage from 'components/Intro/inputPage';
import BottomIntro from 'components/Intro/bottomIntro';
import { getOrganisationList } from 'service';
import { IOrganisation } from 'types/organisation';

function Home() {
  const [organisationList, setOrganisationList] = useState<IOrganisation[]>([]);

  const fetchData = async () => {
    try {
      const data = await getOrganisationList();
      setOrganisationList(data);
    } catch (error) {
      setOrganisationList([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Intro />
      <InputPage/>
      <CategoryFilter/>
      <div className={classes.cardListWrapper}>
        {organisationList.map(organisation => (
          <CardItem {...organisation} key={organisation.addressId} />
        ))}
      </div>
      <BottomIntro/>
    </div>
  );
}

export default Home;
