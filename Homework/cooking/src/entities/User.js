import { nanoid } from "nanoid";
const maleAvatar = "../../public/male-avatar.png";
const femaleAvatar = "../../public/woman-avatar.png";

export class User {
  constructor(
    fullname,
    username,
    password,
    gender,
    role = "user",
    photo = "",
    bio = "",
    status = "active"
  ) {
    this.id = nanoid();
    this.fullname = fullname;
    this.username = username;
    this.password = password;
    this.gender = gender; // 1-male 0-female
    this.role = role;
    if (photo === "") this.photo = gender ? maleAvatar : femaleAvatar;
    this.bio = bio;
    this.status = status;
    this.registerDate = Date.now();
    this.lastModified = Date.now();
  }
}
