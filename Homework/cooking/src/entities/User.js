import { nanoid } from "nanoid";
const maleAvatar = "../../public/male-avatar.png";
const femaleAvatar = "../../public/woman-avatar.png";

export class User {
  constructor(
    id="",
    fullname,
    username,
    password,
    gender,
    role = "user",
    photo = "",
    bio = "",
    status = "active",  
    shareDate = 0,
    lastModified = 0
  ) {
    this.id = id === "" ? nanoid() : id;
    this.fullname = fullname;
    this.username = username;
    this.password = password;
    this.gender = gender; // 1-male 0-female
    this.role = role;
    if (photo === "") {this.photo = gender ? maleAvatar : femaleAvatar} else { this.photo=photo}
    this.bio = bio;
    this.status = status;
    this.shareDate = shareDate === 0 ? Date.now() : shareDate ;
    this.lastModified = lastModified === 0 ? Date.now() : lastModified;
  }
}
