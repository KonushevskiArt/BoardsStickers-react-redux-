import axios from "axios";

export default axios.create({
  baseURL: 'https://boards-of-stickers-default-rtdb.europe-west1.firebasedatabase.app/'
})