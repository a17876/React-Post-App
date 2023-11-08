import { TextInput, Button, Group, Box } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate, useLoaderData } from "react-router-dom";
import postDetailsLoader from "./PostDetails.page";

function EditPostPage() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const currentURL = window.location.href;
  const postId = currentURL.match(/\/(\d+)\/edit/)[1] - 1;


  const form = useForm({
    initialValues: {
      id: data.post.id,
      title: data.post.title,
      category: data.post.category,
      image: data.post.image,
      content: data.post.content,
    },
    fields: {
      id: { hidden: true }, // ID 필드를 숨김 처리
    },

  });

  const handleSubmit = async (values) => {
    const res = await axios.post(`${DOMAIN}/api/posts/edit`, values);

    if (res?.data.success) {
      navigate("/posts");
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter a Title"
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Category"
          placeholder="Enter a Category"
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image"
          placeholder="Enter an Image"
          {...form.getInputProps("image")}
        />

        <TextInput
          label="Content"
          placeholder="Enter some content"
          {...form.getInputProps("content")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default EditPostPage;
