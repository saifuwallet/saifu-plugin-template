// eslint-disable-next-line import/no-unresolved
import { FunctionComponent, useState } from 'react';
import { useMutation, usePublicKey, useTokenAccounts } from 'saifu';

import Button from '../components/Button';

const MyView = ({ color }: { color: string }) => {
  // you can use hooks exposed by Saifu directly
  const pk = usePublicKey();
  const tokenAccounts = useTokenAccounts();
  console.log('TokenAccounts: ', tokenAccounts.data);

  // but also any normal react hook
  const [clicks, setClicks] = useState(0);

  // or more advanced hooks like useQuery and useMutation (exported by Saifu)
  const resetState = useMutation(async () => {
    console.log('Doing something async here...');

    // artificial timeout
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setClicks(0);
  });

  const handleClick = () => {
    setClicks((c) => c + 1);
  };

  const buttonText = (clicks === 0 && 'Click me') || `Clicked ${clicks} times`;

  return (
    <div>
      {/* we can use tailwind classes */}
      <div className="space-y-4">
        <h1>My fancy Plugin</h1>
        <p>Your public key is: {pk?.toString()}</p>
        <p>Your favorite color is: {color}</p>
        <Button
          disabled={resetState.isLoading}
          isLoading={resetState.isLoading}
          text={buttonText}
          onClick={handleClick}
        />
        <Button
          isLoading={resetState.isLoading}
          disabled={resetState.isLoading}
          text="Reset"
          onClick={() => resetState.mutateAsync()}
        />
      </div>
    </div>
  );
};

export default MyView;
