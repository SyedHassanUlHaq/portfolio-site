import Head from "next/head";

type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

export default function SeoHead({
  title = "Syed Hassan Ul Haq – Portfolio",
  description = "I design systems that think, automate, and scale — from backend APIs to AI agents and post-quantum silicon cores",
  image = "/preview.png", // Replace with actual image path
  url = "https://syedhassanulhaq.github.io/portfolio-site/", // Replace with your real URL
}: SeoProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
