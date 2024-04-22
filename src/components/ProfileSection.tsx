import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { GitHubUser } from "@/types/profileType";
import style from "@/styles/Home.module.css";
import Button from "@mui/material/Button";
import FollowersIcon from "@/icon/FollowerIcon";
import CompanyIcon from "@/icon/CompanyIcon";
import LocationIcon from "@/icon/LocationIcon";
import EmailIcon from "@/icon/MailIcon";

const ProfileSection = () => {
  const [profileData, setProfileData] = useState<GitHubUser>({
    avatar_url: "",
    name: "",
    login: "",
    bio: "",
    followers: 0,
    following: 0,
    company: "",
    location: "",
    email: "",
  });
  const getProfileData = async () => {
    const { data }: { data: GitHubUser } = await axios.get(
      "https://api.github.com/users/supreetsingh247"
    );
    console.log(data);
    setProfileData({
      avatar_url: data.avatar_url,
      name: data.name,
      login: data.login,
      bio: data.bio,
      followers: data.followers,
      following: data.following,
      company: data.company,
      location: data.location,
      email: `${data.login}@gmail.com`,
    });
  };
  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div>
      <Avatar
        alt="Remy Sharp"
        src={profileData.avatar_url}
        className={style.avatar}
      />
      <div className={style.fullname}>{profileData.name}</div>
      <div className={style.login}>{profileData.login}</div>
      <div style={{ width: "90%", marginBlock: 20 }}>
        <Button variant="outlined" className={style.followButton}>
          Follow
        </Button>
      </div>
      <div className={style.bio}>{profileData.bio}</div>
      <div style={{ marginBlock: 10 }}>
        <FollowersIcon />
        <span>
          <span style={{ color: "#FFF" }}>{profileData.followers}</span>
          <span style={{ color: "#848d97" }}>followers</span>
        </span>
        <span style={{ marginLeft: 10 }}>
          <span style={{ color: "#FFF" }}>{profileData.following}</span>
          <span style={{ color: "#848d97" }}>following</span>
        </span>
      </div>
      <div className={style.intro}>
        <CompanyIcon /> {profileData.company}
      </div>
      <div className={style.intro}>
        <LocationIcon /> {profileData.location}
      </div>
      <div className={style.intro}>
        <EmailIcon />
        {profileData.email}
      </div>
    </div>
  );
};

export default ProfileSection;
