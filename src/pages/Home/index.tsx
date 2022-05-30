import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classes from './style.module.scss';
import Intro from 'components/Intro';
import CardItem from 'components/CardItem';
import CategoryFilter from 'components/CategoryFilter';
import InputPage from 'components/Intro/InputPage';
import { getOrganisationList } from 'service';
import { ECategoryTypes, IOrganisation } from 'types/organisation';
import xor from 'lodash/xor';

function Home() {
  const [organisationList, setOrganisationList] = useState<IOrganisation[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<ECategoryTypes[]>([]);

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

  const displayOrganizations = useMemo(
    () =>
      categoryFilters?.length > 0 ? organisationList.filter(o => categoryFilters.includes(o.type)) : organisationList,
    [organisationList, categoryFilters],
  );

  const handleSelectCategory = useCallback(
    (e: ECategoryTypes) => setCategoryFilters(preValue => xor(preValue, [e])),
    [],
  );

  return (
    <div>
      <Intro />
      <InputPage />
      <CategoryFilter categoryFilters={categoryFilters} onSelect={handleSelectCategory} />
      <div className={classes.cardListWrapper}>
        {displayOrganizations.map(organisation => (
          <CardItem {...organisation} key={organisation.addressId} />
        ))}
      </div>
    </div>
  );
}

export default Home;
