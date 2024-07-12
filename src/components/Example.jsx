import { useState } from "react";

import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

const Example = () => {
  const [currentValue, setCurrentValue] = useState(0);

  const increment = () => {
    const nextValue = currentValue + 1;
    setCurrentValue(nextValue);
  };

  const decrement = () => {
    const prevValue = currentValue - 1;
    setCurrentValue(prevValue);
  };

  return (
    <div>
      <input type="text" />
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Left}
        style="text"
        onClick={increment}
      />
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Right}
        style="text"
        onClick={decrement}
      />
    </div>
  );
};

export default Example;
