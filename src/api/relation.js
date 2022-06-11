import axios from "axios";

const baseurl = "http://139.196.202.57:8100";

export const relateBetweenAuthor = (index1,index2) => {
    let url = baseurl+"/api/basicService/auandau?index1="+index1+"&index2="+index2;
    console.log(url);
    return axios.get(`${url}`);
};
export const relateBetweenPaper = (index1,index2) => {
    let url = baseurl+"/api/basicService/paandpa?index1="+index1+"&index2="+index2;
    console.log(url);
    return axios.get(`${url}`);
};
export const relateBetweenPaperAuthor = (index1,index2) => {
    let url = baseurl+"/api/basicService/paandau?index1="+index1+"&index2="+index2;
    console.log(url);
    return axios.get(`${url}`);
};
