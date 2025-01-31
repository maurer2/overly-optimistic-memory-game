import Card from '../components/Card';
import FormWrapper from '../components/FormWrapper';
import handleFormSubmit from './sever-functions/handle-form-submit/handle-form-submit';
import { container, list } from './styles';

export default function Home() {
  return (
    <main className={container}>
      <FormWrapper />

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
