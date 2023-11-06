import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Text, Title, TextInput, Button, Image } from '@mantine/core';
import classes from './EmailBanner.module.css';
import { useLoaderData } from "react-router-dom";


function PostDetailsPage() {
  const posts = useLoaderData();

  return (
    <div className={classes.wrapper}>
    <div className={classes.body}>
      <Title className={classes.title}>{posts[1].title}</Title>
      <Text fw={500} fz="lg" mb={5}>
      {posts[1].category}
      </Text>
      <Text fz="sm" c="dimmed">
        {posts[1].content}
      </Text>

      <div className={classes.controls}>
        <Button className={classes.control}>Edit</Button>
      </div>
    </div>
    <Image src={posts[1].image} className={classes.image} />
  </div>
  );
}

export const postDetailsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  console.log("Detail page ran!");
  return res.data;
};

export default PostDetailsPage;
