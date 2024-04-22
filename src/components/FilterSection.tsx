import React, { ChangeEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import axios from "axios";
import style from "@/styles/Home.module.css";
import { RepoElement } from "@/types/profileType";
import StarIcon from "@/icon/StarIcon";
import ForkIcon from "@/icon/ForkIcon";
import MITLicense from "@/icon/MITLicense";
import dayjs from "dayjs";
import { Divider } from "@mui/material";

type DataColorType = {
  [key: string]: string;
};

const ColorPicker: DataColorType = {
  JavaScript: "#f1e05a",
  CSS: "#563d7c",
  HTML: "#e34c26",
};

let interval: any = 0;
const FilterSection = () => {
  const [type, setType] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [repoData, setRepoData] = useState<[] | RepoElement[]>([]);
  const [actualData, setActualData] = useState<[] | RepoElement[]>([]);

  const getRepoData = async () => {
    const { data } = await axios.get(
      "https://api.github.com/users/supreetsingh247/repos"
    );
    setRepoData(data);
    setActualData(data);
  };

  useEffect(() => {
    getRepoData();
  }, []);

  const handleChange = (value: string, changeType: string) => {
    const filterData = actualData
      .filter((ele: RepoElement) => {
        return (
          (ele[
            changeType === "type"
              ? (value as keyof RepoElement)
              : (type as keyof RepoElement)
          ] ||
            (changeType === "type" ? value === "" : type === "")) &&
          (ele.language ===
            (changeType === "language"
              ? (value as keyof RepoElement)
              : (language as keyof RepoElement)) ||
            (changeType === "language" ? value === "" : language === ""))
        );
      })
      .sort((a: RepoElement, b: RepoElement) =>
        a[
          changeType === "sort"
            ? (value as keyof RepoElement)
            : (sort as keyof RepoElement)
        ] >
        b[
          changeType === "sort"
            ? (value as keyof RepoElement)
            : (sort as keyof RepoElement)
        ]
          ? value === "name"
            ? 1
            : -1
          : value === "name"
          ? -1
          : 1
      );
    console.log(filterData);

    setRepoData(filterData);

    switch (changeType) {
      case "type":
        setType(value);
        break;
      case "language":
        setLanguage(value);
        break;
      case "sort":
        setSort(value);
        break;
      default:
        console.log(`Invalid filter type ${changeType}`);
    }
  };

  const handleFilter = (e: any) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      const searchText = e.target.value;
      const filterData = actualData.filter(
        (ele: RepoElement) =>
          ele.name.toLowerCase().includes(searchText.toLowerCase()) ||
          searchText === ""
      );

      setRepoData(filterData);
    }, 1000);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={12} md={7}>
          <TextField
            id="outlined-basic"
            label="Find a repository..."
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleFilter}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#848d97",
              },
              "& .MuiInputBase-input": {
                color: "#848d97",
              },
            }}
            InputLabelProps={{
              style: { color: "#848d97" }, // Change placeholder color to black
            }}
          />
        </Grid>
        <Grid item sm={12} md={1.66}>
          {" "}
          <FormControl fullWidth size="small">
            <InputLabel id="demo" sx={{ color: "#848d97" }}>
              Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="type"
              onChange={(e: SelectChangeEvent) =>
                handleChange(e.target.value, "type")
              }
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#848d97",
                  background: "rgba(256,256,256, 0.1)",
                },
                color: "#848d97",
              }}
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"sources"}>Sources</MenuItem>
              <MenuItem value={"fork"}>Fork</MenuItem>
              <MenuItem value={"mirror_url"}>archive</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={12} md={1.66}>
          {" "}
          <FormControl fullWidth size="small">
            <InputLabel id="language" sx={{ color: "#848d97" }}>
              Language
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              label="Language"
              onChange={(e: SelectChangeEvent) =>
                handleChange(e.target.value, "language")
              }
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#848d97",
                  background: "rgba(256,256,256, 0.1)",
                },
                color: "#848d97",
              }}
            >
              {" "}
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"HTML"}>HTML</MenuItem>
              <MenuItem value={"CSS"}>CSS</MenuItem>
              <MenuItem value={"JavaScript"}>JavaScript</MenuItem>
            </Select>
          </FormControl>
        </Grid>{" "}
        <Grid item sm={12} md={1.66}>
          {" "}
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label" sx={{ color: "#848d97" }}>
              Sort
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="Sort"
              onChange={(e: SelectChangeEvent) =>
                handleChange(e.target.value, "sort")
              }
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#848d97",
                  background: "rgba(256,256,256, 0.1)",
                },
                color: "#848d97",
              }}
            >
              <MenuItem value={"updated_at"}>Last Update</MenuItem>
              <MenuItem value={"name"}>Name</MenuItem>
              <MenuItem value={"stargazers_count"}>Stars</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {repoData.length > 0 ? (
        repoData.map((ele: RepoElement) => (
          <div key={ele.id} className={style.repoParent}>
            <Divider sx={{ background: "#848d97", my: 2 }} />
            <div>
              <h2 style={{ color: "#418bea", display: "inline" }}>
                {ele.name}
              </h2>
              <span className={style.visibility}>{ele.visibility}</span>
            </div>
            <div style={{ marginBlock: "15px" }}>{ele.description}</div>
            <div style={{ display: "flex" }}>
              {ele.language && (
                <span style={{ display: "flex" }}>
                  <div
                    className={style.languageCircle}
                    style={{
                      background:
                        ColorPicker[ele.language as keyof DataColorType],
                    }}
                  ></div>{" "}
                  <span>{ele.language}</span>
                </span>
              )}
              {ele.stargazers_count !== 0 && (
                <div style={{ marginLeft: 10 }}>
                  <StarIcon /> <span>{ele.stargazers_count}</span>
                </div>
              )}
              {ele.fork && (
                <div style={{ marginLeft: 10 }}>
                  <ForkIcon />
                  {ele.forks}
                </div>
              )}
              {ele?.license?.key === "mit" && (
                <div style={{ marginLeft: 10 }}>
                  <MITLicense />
                  {ele.license?.name}
                </div>
              )}
              <span style={{ marginLeft: 10 }}>
                Updated On {dayjs(ele.updated_at).format("MMM D, YYYY")}
              </span>
            </div>
            <div className={style.star}>
              <div style={{ marginTop: 1 }}>
                <StarIcon />{" "}
              </div>
              <span style={{ color: "white", fontWeight: 500, marginLeft: 10 }}>
                Star
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className={style.filterNotMatch}>
          supreetsingh247 doesn’t have any repositories that match.
        </div>
      )}
    </>
  );
};

export default FilterSection;
