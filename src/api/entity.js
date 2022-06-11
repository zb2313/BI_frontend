import axios from "axios";

const baseurl = "http://139.196.202.57:8100";

export const relateEntityAuthor = (index) => {
    let url = baseurl+"/api/basicService/allauthor?index="+index;
    console.log(url);
    return axios.get(`${url}`);
};
export const relateEntityPaper = (index) => {
    let url = baseurl+"/api/basicService/allpaper?index="+index;
    console.log(url);
    return axios.get(`${url}`);
};
export const relateEntityAll = (index) => {
    let url = baseurl+"/api/basicService/allid?index="+index;
    console.log(url);
    return axios.get(`${url}`);
};
