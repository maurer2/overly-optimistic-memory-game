import { icons } from '../services/get-cards';

import Card from '../components/Card';
import FormContainer from '../components/FormContainer';

import { container, list } from './styles';

export default function Home() {
  console.log(icons);

  return (
    <main className={container}>
      <FormContainer />

      <hr />

      <ul className={list}>
        {Array.from({ length: 12 }, (_, index) => (
          <>
            <li key={`${index}-a`}>
              <Card name="box" />
            </li>
            <li key={`${index}-b`}>
              <Card name="minus" />
            </li>
          </>
        ))}
      </ul>
    </main>
  );
}
