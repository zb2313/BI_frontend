import axios from "axios";

const baseurl = "http://139.196.202.57:8100/api/author/";

export const likePost = (data) => {
    let url = baseurl+"authorlink?author="+data;
    console.log(url);
    return axios.get(`${url}`);
};
