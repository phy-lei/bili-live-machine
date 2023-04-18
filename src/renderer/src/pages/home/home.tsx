import { Button } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/danmu');
  };

  return (
    <div>
      <h1>123</h1>
      <div>
        <Button type="primary" onClick={handleClick}>
          Primary
        </Button>
      </div>
    </div>
  );
};
export default Home;
