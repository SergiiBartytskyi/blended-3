import { Container, CountryList, Heading, Section, Loader } from 'components';
import { useEffect, useState } from 'react';

import { getCountries } from 'service/countryApi';

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await getCountries();

        setCountries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <Section>
      <Container>
        <CountryList countries={countries} />
        {error && <Heading title={error} bottom />}
        {loading && <Loader />}
      </Container>
    </Section>
  );
};
