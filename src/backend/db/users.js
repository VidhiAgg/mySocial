import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */
export const users = [
  {
    _id: uuid(),
    fullName: "Vidhi Aggarwal",
    username: "vidhiaggarwal",
    password: "guestLogin123",
    bio:"Full Stack Developer | BackendDeveloper | Frontend developer ",
    profilePhoto: "https://picsum.photos/id/1012/150",
    following: [],

    followers: [
      { _id: uuid(), fullName: "John Doe", username: "johndoe",profileAvatar:
      "https://picsum.photos/id/1009/150" },
      { _id: uuid(), fullName: "Adarsh Balika", username: "adarshbalika",profileAvatar:
      "https://picsum.photos/id/1009/150" }
    ],
    bookmarks:[],
    
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    fullName: "Adarsh Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    bio:"Software engineer | Travel enthusiast",
    profilePhoto: "https://picsum.photos/id/1012/150",
    following: [
      { _id: uuid(), fullName: "John Doe", 
      username: "johndoe",profileAvatar:
      "https://picsum.photos/id/1009/150" },
      { _id: uuid(), fullName: "Vidhi Aggarwal", 
      username: "vidhiaggarwal",profileAvatar:
      "https://picsum.photos/id/1009/150" },

    ],

    followers: [
      { _id: uuid(), fullName: "John Doe", username: "johndoe",profileAvatar:
      "https://picsum.photos/id/1009/150" }
    ],
    bookmarks:[],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    fullName: "John Doe",
    username: "johndoe",
    password: "123john",
    bio: "Hey there, John here",
    website: "https://www.johndoe.com",
    profileAvatar:
      "https://picsum.photos/id/1009/150",
    createdAt: "2022-05-05",
    updatedAt: formatDate(),
    bookmarks:[],
    following: [
      { _id: uuid(), fullName: "Prashant Singh Chauhan", username: "pareshaaaaan",profileAvatar:
      "https://picsum.photos/id/1012/150", },
      { _id: uuid(), fullName: "Aditya Jadhav", username: "aditya_jadhav",profileAvatar:
      "https://picsum.photos/id/100/150" },
      { _id: uuid(), fullName: "Adarsh Balika", 
      username: "adarshbalika",profileAvatar:
      "https://picsum.photos/id/1012/150" },
    ],
    followers: [
      { _id: uuid(), fullName: "Anshaal Khanna", username: "anshaal10",profileAvatar:
      "https://picsum.photos/id/1005/150" },
      { _id: uuid(), fullName: "Prashant Singh Chauhan", username: "pareshaaaaan",profileAvatar:
      "https://picsum.photos/id/1012/150", },
      { _id: uuid(), fullName: "Anshaal Khanna", username: "anshaal10",profileAvatar:
      "https://picsum.photos/id/1005/150" },
      { _id: uuid(), fullName: "Adarsh Balika", 
      username: "adarshbalika",profileAvatar:
      "https://picsum.photos/id/1012/150" },
      

    ],
  },
  {
    _id: uuid(),
    fullName: "Anshaal Khanna",
    username: "anshaal10",
    password: "anshaal123",
    bio: "Hey there, Anshaal here",
    website: "https://www.nike.com",
    profileAvatar:
      "https://picsum.photos/id/100/150",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bookmarks:[],
    following: [
      { _id: uuid(), fullName: "Prashant Singh Chauhan", username: "pareshaaaaan",profileAvatar:
      "https://picsum.photos/id/1012/150", },
      { _id: uuid(), fullName: "John Doe", username: "johndoe",profileAvatar:
      "https://picsum.photos/id/1009/150" },
    ],
    followers: [
      { _id: uuid(), fullName: "Aditya Jadhav", username: "aditya_jadhav",profileAvatar:
      "https://picsum.photos/id/100/150" },
    ],
  },
  {
    _id: uuid(),
    fullName: "Aditya Jadhav",
    username: "aditya_jadhav",
    password: "jadhav123",
    bio: "Hello Fritter, Jadhav here!",
    website: "https://www.wikipedia.com",
    profileAvatar:
      "https://picsum.photos/id/100/150",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bookmarks:[],

    following: [
      { _id: uuid(), fullName: "Prashant Singh Chauhan", username: "pareshaaaaan",profileAvatar:
      "https://picsum.photos/id/1012/150", },
      { _id: uuid(), fullName: "Anshaal Khanna", username: "anshaal10",profileAvatar:
      "https://picsum.photos/id/1005/150" },
    ],
    followers: [
      { _id: uuid(), fullName: "John Doe", username: "johndoe",profileAvatar:
      "https://picsum.photos/id/1009/150" },
      { _id: uuid(), fullName: "Anshaal Khanna", username: "anshaal10",profileAvatar:
      "https://picsum.photos/id/1005/150" },
    ],
  },

];
