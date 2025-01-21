import axios, { AxiosHeaders } from "axios";

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYmZlOGY0MDU5MTUxMTQzY2I5NGE1YTY3ZGY2ZTQxOCIsIm5iZiI6MTczNzQ2MzA0OC43NzksInN1YiI6IjY3OGY5NTA4ZTFhZjIwNTkwZmFhYjhmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1I2z68IGFgxFiL14CFvY2FHRp4IsO-2FtrksfS0lXcA'
      }
    
});

export default instance;