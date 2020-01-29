import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const Index = props => {
  return (
    <Layout pathname="/">
      <Header />
      {props.posts.map(post => (
        <div>
          <Link
            key={post.data.slug}
            href={{ pathname: `/blog/${post.data.slug}` }}
          >
            <h3>{post.data.title}</h3>
          </Link>
          <ReactMarkdown source={post.content} />
          <br />
        </div>
      ))}
    </Layout>
  );
};

Index.getInitialProps = async function(ctx) {
  const posts = (context => {
    const keys = context.keys();
    const values = keys.map(context);
    const data = keys.map((key: string, index: number) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, "")
        .split(".")
        .slice(0, -1)
        .join(".");
      const value = values[index];
      // Parse yaml metadata & markdownbody in document
      const post = matter(value.default);
      console.log(JSON.stringify(post));
      return {
        data: { ...post.data, slug },
        content: post.content.substring(0, 300)
      };
    });

    return data;
  })((require as any).context("../../content/blog", true, /\.md$/));

  return {
    posts
  };
};

export default Index;
