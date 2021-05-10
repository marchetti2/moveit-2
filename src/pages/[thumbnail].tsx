import { GetServerSideProps } from "next";

import Head from "next/head";
import { useEffect } from "react";

import { useColorsController } from "../contexts/ColorsControllerContext";
import { api } from "../services/api";

import styles from "../styles/pages/Thumbnail.module.css";

interface UserData {
  email: string;
  thumbnailUrl: string;
}

interface ThumbnailData {
  thumbnailUrl: string;
}

const Thumbnail: React.FC<ThumbnailData> = ({
  thumbnailUrl,
}: ThumbnailData) => {
  const { setPageActive } = useColorsController();

  useEffect(() => {
    setPageActive("thumbnail");
  }, []);

  return (
    <main>
      <Head>
        <title>Move.it</title>
        <meta name="description" content="Alcançei um novo level no move.it" />
        <meta property="og:site_name" content="Move.it" />
        <meta property="og:title" content="Move.it" />
        <meta
          property="og:description"
          content="Alcançei um novo level no move.it"
        />
        <meta property="og:image" content={thumbnailUrl} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Move.it" />
        <meta
          name="twitter:description"
          content="Alcançei um novo level no move.it"
        />
        <meta name="twitter:image" content={thumbnailUrl} />
      </Head>
      <div className={styles.container}>
        <a href="https://moveit-2-five.vercel.app/">
          <img src={thumbnailUrl} alt="thumbnail" />
        </a>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<ThumbnailData> = async ({
  params,
}) => {
  const { thumbnail } = params;
  const email = thumbnail;

  const response = await api.get<UserData>("/users", {
    params: {
      email,
    },
  });

  const { thumbnailUrl } = response.data;

  return {
    props: {
      thumbnailUrl,
    },
  };
};

export default Thumbnail;
