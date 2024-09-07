import {
  Container,
  CountryList,
  Heading,
  Loader,
  SearchForm,
  Section,
} from 'components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/countryApi';

export const SearchCountry = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const region = searchParams.get('region') || '';

  const handleSearch = region => {
    setSearchParams({ region: region });
    setError(null);
  };

  useEffect(() => {
    if (!region) return;
    const getRegion = async () => {
      setLoading(true);
      try {
        const data = await fetchByRegion(region);
        setCountries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getRegion();
  }, [region]);
  return (
    <Section>
      <Container>
        <SearchForm onSubmit={handleSearch} />
        <CountryList countries={countries} />
        {loading && <Loader />}
        {error && <Heading title={error} bottom />}
      </Container>
    </Section>
  );
};
