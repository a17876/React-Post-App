import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Text, Title, TextInput, Button, Image } from '@mantine/core';
import classes from './EmailBanner.module.css';
import { useLoaderData, useLocation  } from "react-router-dom";



function PostDetailsPage() {
  const posts = useLoaderData();
  const location = useLocation();
  const currentURL = location.pathname;
  const postId = parseInt(currentURL.split("/").pop(), 10) -1 ; 
  

  return (
    <div className={classes.wrapper}>
    <div className={classes.body}>
      <Title className={classes.title}>{posts[postId].title}</Title>
      <Text fw={500} fz="lg" mb={5}>
      {posts[postId].category}
      </Text>
      <Text fz="sm" c="dimmed">
        {posts[postId].content}
      </Text>

      <div className={classes.controls}>
        <Button className={classes.control}>Edit</Button>
      </div>
    </div>
    <Image src={posts[postId].image} className={classes.image} />
  </div>
  );
}

export const postDetailsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  console.log("Detail page ran!");
  return res.data;
};

export default PostDetailsPage;
