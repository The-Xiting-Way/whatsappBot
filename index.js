import twilio from "twilio";
import "dotenv/config";
import axios from "axios";
const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const subreddit = "linuxmemes";

(async () => {
  const res = await axios.get(`https://www.reddit.com/r/${subreddit}.json`);
  const post = res.data.data.children[1].data;
  if (post.title.match(/(https?:\/\/.*\.(:png|jpg|webp|jpeg))/)) return;
  client.messages
    .create({
      body: post.title,
      mediaUrl: post.url_overridden_by_dest,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+917988201983",
    })
    .then(() => console.log("message sent"));
})();
