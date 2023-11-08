import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
  editPost,
  users,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());


// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  // Sleep delay goes here
  res.json(posts);
});

// ⭐️ TODO: Implement this yourself
app.get("/api/posts/:id", (req, res) => {
  let response = {}
  const index = parseInt(req.params.id) - 1;
 
  const user = findUserById(posts[index].userId);
  if (user) {
    const emailParts = user.email.split("@");
    const author = emailParts[0];
    response = {
      author,
      post: posts[index],
    }
  }
  // The line below should be fixed.
  res.json(response);

});

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", (req, res) => {
  const token = req.headers && req.headers["authorization"]?.split(" ")[1];
  if (token) {
    const user = jwt.decode(token);
    if (user && typeof user === "object") {
      const id = user.id;
      const incomingPost = req.body;
      addPost(incomingPost, id);
    }
  }
  res.status(200).json({ success: true });
});

app.post("/api/posts/edit", (req, res) => {
  const incomingPost = req.body;
  editPost(incomingPost);
  res.status(200).json({ success: true });
});


// turning on the webserver. listening the request from diffrent browser.
app.listen(port, () => console.log("Server is running"));
