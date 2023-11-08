import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Text, Title, TextInput, Button, Image } from '@mantine/core';
import classes from './EmailBanner.module.css';
import { useLoaderData, useLocation  } from "react-router-dom";



function PostDetailsPage() {
  const post = useLoaderData();
  const location = useLocation();
  const currentURL = location.pathname;
  const postId = parseInt(currentURL.split("/").pop(), 10) -1 ; 

  return (
    <div className={classes.wrapper}>
    <div className={classes.body}>
    <Text fw={500} fz="lg" mb={5}>
      {post.category}
      </Text>
      <Title className={classes.title}>{post.title}</Title>
      <Text fw={500} fz="lg" mb={5}>
      {post.category}
      </Text>
      <Text fz="sm" c="dimmed">
        {post.content}
      </Text>

      <div className={classes.controls}>
        <Button className={classes.control}>
        <Link to={'edit'}>Edit</Link>
        </Button>
      </div>
    </div>
    <Image src={post.image} className={classes.image} />
  </div>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  console.log("Detail page ran!");
  return res.data;
};

export default PostDetailsPage;
