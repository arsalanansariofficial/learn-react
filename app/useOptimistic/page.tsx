'use client';

import {
  type SubmitEvent,
  startTransition,
  useOptimistic,
  useState
} from 'react';

interface Data {
  name: string;
}

export default function Page() {
  const [name, setName] = useState('Arsalan Ansari');
  const [optimisticName, setOptimisticName] = useOptimistic(name);

  async function actionUpdateName(formData: FormData) {
    const data = Object.fromEntries(formData) as unknown as Data;

    setOptimisticName(data.name);

    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });

    if (data.name.toLowerCase() === 'invalid name')
      return alert('Please enter a valid name');

    console.log(`Action, ${data.name}`);
    setName(data.name);
  }

  function updateNameHandler(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    ) as unknown as Data;

    startTransition(async () => {
      setOptimisticName(data.name);

      await new Promise(resolve => {
        setTimeout(resolve, 3000);
      });

      if (data.name.toLowerCase() === 'invalid name')
        return alert('Please enter a valid name');

      console.log(`Hanlder, ${data.name}`);
      setName(data.name);
    });
  }

  return (
    <main>
      <header>
        <p>
          The useOptimistic hook is to display the intermediate state while an
          action has been running.
        </p>
      </header>
      <section>
        Selected name is <i>{optimisticName}</i>
      </section>
      <section>
        <form onSubmit={updateNameHandler} action={actionUpdateName}>
          <label htmlFor='name'>Name</label>
          <input placeholder='Name' type='text' name='name' id='name' />
          <button type='submit'>Submit</button>
        </form>
      </section>
      <section>
        <p>
          Try submitting <b>Invalid Name</b> in the form, the name will be
          updated for <b>3 seconds</b> then it will fallback to the previous
          value.
        </p>
        <p>
          Optimistic updates other outside action requires the updates to be
          wraped inside a transition.
        </p>
      </section>
    </main>
  );
}
