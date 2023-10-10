import express, { response } from "express";
import axios from "axios";
import _ from "lodash";

const router = express.Router();

router.get("/blog-stats", async (req, res) => {
  try {
    const response = await axios.get(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      {
        headers: {
          "x-hasura-admin-secret":
            "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
        },
      }
    );

    const data = response.data;

    // data analysis

    // all blogs
    const blogs = data.blogs;

    //total no of blogs
    const totalBlogs = blogs.length;

    // longest title
    const longestTittle = _.maxBy(blogs, (blogs) => blogs.title.length);

    // Number of blogs with "privacy" in the title
    const includePrivacyInTitle = _.filter(blogs, (blogs) =>
      _.includes(_.toLower(blogs.title), "privacy")
    );

    // Array of unique blog titles
    const uniqueTitle = _.uniqBy(blogs, "title").map((blog) => blog.title);

    const jsonObj = {
      "total no of blog": totalBlogs,
      "The title of the longest blog": longestTittle,
      "Number of blogs with privacy in the title": includePrivacyInTitle,
      "An array of unique blog titles": uniqueTitle,
    };

     response.json({ jsonObj });

  } catch (err) {
    res.status(500).json({ err: "internal server error" });
  }
});





//  blog search endpoint
app.get("/api/blog-search", (req, res) => {

  try {
    const query = req.query.query.toLowerCase();

    // search functionality
    const filteredBlogs = _.filter(blogs, (blog) =>
      _.includes(_.toLower(blog.title), query)
    );

    res.json(filteredBlogs);
   } 
   
  catch(error){
    res.status(500).json({ error: "Internal server error" });
  }


});



export default router;
