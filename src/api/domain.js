import axios from "axios";

const baseurl = "http://139.196.202.57:8100/api/basicService/";

export const keyUnit = (data) => {
    let url = baseurl+"keyAffiliation?interest="+encodeURI(data);
    console.log(url);
    return axios.get(`${url}`);
};
export const keyAuthor = (data,type) => {
    let url = baseurl+"keyAuthor?interest="+encodeURI(data)+"&type="+type;
    console.log(url);
    return axios.get(`${url}`);
};
export const keyJournal = (data) => {
    let url = baseurl+"keyVenue?interest="+encodeURI(data);
    console.log(url);
    return axios.get(`${url}`);
};
