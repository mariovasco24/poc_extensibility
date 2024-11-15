// const TOKEN = 'eyJraWQiOiJxMXRhYWNtTTI3YVFDZ3QwUWktRlZjaTZ0VExLT2lTTXBSdl9ScDdxOE84IiwiZW5jIjoiQTEyOENCQy1IUzI1NiIsImFsZyI6IlBCRVMyLUhTMjU2K0ExMjhLVyIsInAyYyI6MzIzMCwicDJzIjoiaWpPTzVUX3A4VjBjdDJMeGNwc2FhQSJ9.rKVveNXqXw2jR65iZChIz0dmlu2XNt2WfGifaTELJFtSXj7mKL3UPg.vuAQ1vBJQYoryqU_1RDDTQ.jjndms6wvkPHXt3js7M6-fPdYF_feN3DKHTofWnruVwQeX8wqIJ9OXl7OaNhdPVQOMDhdT7sSF517rzGj3I24McfJ1BCWtJiGk1aAJkcwXmw75Hg30HkEITHR3lMbsVCM3bm8qWEDRTm3rGKZd-CUnlPPpEkrBrwYcDXkGdKYB5skvVhsQQx_qiSYVrJzx5Esbn1-BMB_hfeLGDIkYIyTOgMgyAC_2fti2itCSI-f61psevvoiwZ7FJ-PusqI57nIa8Z6pMWkbLwS6cf0KkwAdxhvdlIWPkK7YyPkf7Zqf9qEWU8ZuLsU_cxCi1NQ9sYtlQ7iXM2Uyi17YMo2woTSiipU1TkFEyvIqq7BbOqkX9CY85xwmFwr-N2jZTkQrkD.fHFli-bWOYEap7XJ4tAr3w';
// const QRVEY_URL = 'https://demo.qrvey.com/devapi/v4/user/b2rParx/app/yQlOt3ATZ/qrvey/dQyE9YrDc';
const APIKEY = 'd41d8cd98f00b204e9800998ecf8427e';
const QRVEY_URL = 'https://demo.qrvey.com/devapi/v4/user/51WL5D2/app/_17KyxmyS/qrvey/klo2eAl4Ty';


export function getColumns() {
    return fetch(QRVEY_URL + "/analytiq/chart/question/list", {
        "headers": {
            "content-type": "application/json",
            "x-api-key": APIKEY
        },
        "body": "{\"optionsAttributes\":[\"id\",\"text\",\"type\",\"property\",\"linked\",\"linkid\",\"qrveyid\",\"bucketId\",\"formulaId\",\"formulaType\",\"geogroup\",\"geoGroups\",\"imageUploadOption\",\"format\",\"outputFormat\"],\"splitQuestions\":false}",
        "method": "POST",
    })
        .then(res => res.json());
}


export function getResults(body) {
    return fetch(QRVEY_URL + "/analytiq/uchart/results", {
        "headers": {
            "content-type": "application/json",
            // "authorization": "Bearer " + TOKEN
            "x-api-key": APIKEY
        },
        "body": JSON.stringify(body),
        "method": "POST"
    }) .then(res => res.json());
}