import { Container, CountryInfo, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountry } from 'service/countryApi';

export const Country = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { countryId } = useParams();

  useEffect(() => {
    const getCountry = async () => {
      setLoading(true);
      try {
        const data = await fetchCountry(countryId);
        setCountry(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCountry();
  }, [countryId]);

  return (
    <Section>
      <Container>
        {loading && <Loader />}
        {error && <Heading title={error} bottom />}
        <CountryInfo {...country} />
      </Container>
    </Section>
  );
};
