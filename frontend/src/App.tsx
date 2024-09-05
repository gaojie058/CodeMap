import Layout from '@/components/Layout';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div id='codemap_app'>
        <Layout>
          <Outlet />
        </Layout>
      </div>
    </>
  );
}

export default App;
