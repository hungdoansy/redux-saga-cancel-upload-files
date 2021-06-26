import { useEffect, useState } from "react";
import Head from "next/head";

import Upload from "components/Upload";

const Home: React.FC = () => {
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (count < 5) {
      setCount(count + 1);
      console.log("count", count);
    }
  }, [count]);

  return (
    <div className="container">
      <Head>
        <title>Upload</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Upload />

      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;

          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;

          font-family: Roboto, sans-serif;
          background-color: #ecf0f1;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Home;
