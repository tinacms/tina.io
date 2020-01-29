import React from "react";

import Layout from "../../components/Layout";
import Header from "../../components/Header";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const Index = props => {
  return (
    <Layout pathname="/">
      <Header />
      My blog
      {props.posts.map(p => (
        <div>Blog</div>
      ))}
    </Layout>
  );
};

Index.getInitialProps = async function(ctx) {
  console.log("abc");
  const posts = (context => {
    const keys = context.keys();
    const values = keys.map(context);
    const data = keys.map((key: string, index: number) => {
      // Create slug from filename
      // const slug = key.replace(/^.*[\\\/]/, "");
      const value = values[index];
      // Parse yaml metadata & markdownbody in document
      const post = matter(value.default);
      return {
        post: {
          ...post,
          content: post.content.substring(0, 100)
        }
        // slug
      };
    });

    return data;
  })((require as any).context("../../content/blog", true, /\.md$/));

  return {
    posts
  };
};

export default Index;
