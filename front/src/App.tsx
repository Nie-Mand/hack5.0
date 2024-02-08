import Routes from "~/core/routes";
import Navbar from "~/core/Navbar";
import Footer from "~/core/Footer";
import { useGetMe } from "./core/api/users/context";
import { IPFSProvider } from "react-ipfs";

function App() {
  const { loading } = useGetMe();

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <IPFSProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes />
        <Footer />
      </div>
    </IPFSProvider>
  );
}

export default App;
