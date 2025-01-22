'use server';

export default async function handleFormSubmit(formData: FormData): Promise<void> {
  console.log('handleFormSubmit', JSON.stringify(Object.fromEntries(formData))); // todo: handle array values

  const { promise, resolve } = Promise.withResolvers<unknown>();

  setTimeout(() => {
    resolve({ status: 'success' });
  });

  // return promise;
}
