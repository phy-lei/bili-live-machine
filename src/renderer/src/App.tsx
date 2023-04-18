import Versions from './components/Versions';
import { Button } from '@arco-design/web-react';

function App(): JSX.Element {
  return (
    <div className="container">
      <Versions></Versions>
      <Button type="primary">Hello Arco</Button>
    </div>
  );
}
export default App;
