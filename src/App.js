import React from 'react';

import Timer from './Timer/Timer';

const App = () => {
  return <Timer time={30} step={1000} autoStart={false} />;
};

export default App;
