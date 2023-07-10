import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:"Had a beautiful day.", 
    likes: {
      likeCount: 1,
      likedBy: ["anshaal10"],
      dislikedBy: [],
    },
    username: "adarshbalika",
    postImage: null,
    createdAt: "2023-06-19",
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        comment:
          "Nice!",
        fullName: "Anshaal Khanna",
        username: "anshaal10",
     
        profileAvatar:
        "https://picsum.photos/id/1005/150",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ]
  },
  {
    _id: uuid(),
    content:"Planning for a trip",    
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    postImage: null,
    username: "johndoe",
    createdAt: "2023-06-10",
    updatedAt: formatDate(),
    comments:[
      {
        _id: uuid(),
        comment:
          "Wow!",
        fullName: "John Doe",
        username: "johndoe",
        profileAvatar:
    "https://picsum.photos/id/1012/150",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },

    ]
  },
];
