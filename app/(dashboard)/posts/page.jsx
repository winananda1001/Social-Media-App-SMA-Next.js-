"use client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import classes from "../../../css/Posts.module.css";
import Image from "next/image";
import PostItem from "@/components/Posts/PostItem";
import { useEffect, useState } from "react";
import Link from "next/link";
import Modale from "@/components/Modal/Modal";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [postIdToDelete, setpostIdToDelete] = useState();
  const [open, setopen] = useState(false);
  const handleOpen = (postId) => {
    setopen(true);
    setpostIdToDelete(postId);
  };
  const handleClose = () => setopen(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts", { cache: "no-store" });
      const responseData = await response.json();
      setPosts(responseData);
    };
    fetchPosts();
  }, []);

  return (
    <section className={classes.main_dashboard}>
      <div className={classes.filter_bar}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ padding: "20px", position: "relative", right: "22px" }}
        >
          Posts
        </Typography>
        <Box sx={{ display: "flex", gap: "12px" }}>
          <FormControl sx={{ width: "200px" }}>
            <InputLabel>FIlter</InputLabel>
            <Select placeholder="Filter">
              <MenuItem>Hashtags</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: "200px" }}>
            <TextField label="Search" />
          </FormControl>
          <FormControl>
            <Link className="link_no_decoration" href="/posts/new">
              <Button
                variant="contained"
                size="large"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                }}
              >
                Create new post
                <Image src="/images/add.png" width={30} height={30} />
              </Button>
            </Link>
          </FormControl>
        </Box>
      </div>
      <div className={classes.posts_container}>
        {posts.length === 0 ? (
          <Typography textAlign="center" variant="h4">
            No posts jet
          </Typography>
        ) : (
          posts.map((post) => (
            <PostItem
              key={post.id}
              id={post._id}
              openDeleteModal={() => handleOpen(post._id)}
              description={post.description}
              image={post.image}
              date={post.createdAt}
              likes={post.likes}
              comments={post.comments.length}
              shares={post.shares.length}
            />
          ))
        )}
        {posts.length > 0 && (
          <Modale
            isOpen={open}
            close={handleClose}
            text="Are you sure you want to delete this post?"
            title="Deleting Post Confirmation"
            id={postIdToDelete}
            onCloseModal={handleClose}
            posts={posts}
            setPosts={setPosts}
          />
        )}
      </div>
    </section>
  );
};

export default Posts;
