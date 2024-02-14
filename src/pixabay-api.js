import axios from "axios";

const API_KEY = "42343056-d970fc336103e47429fc1ac41";
const query_options = {
  imageType: "photo",
  orientation: "horizontal",
  safeSearch: "true",
  pretty: "true",
  perPage: 40,
};
const BASE_URL = `https://pixabay.com/api/`;
function fetchApi(query) {
  return axios
    .get(
      BASE_URL +
        `?key=${API_KEY}&q=${query}
    &image_type=${query_options.imageType}
    &orientation=${query_options.orientation}
    &safesearch=${query_options.safeSearch}
    &pretty=${query_options.pretty}
    &per_page=${query_options.perPage}`
    )
    .then((response) => response)
    .then(({ data }) => console.log(data));
}
async function fetchApiAsync(query, page) {
  const pageParam = page || 1;
  try {
    return await axios.get(
      BASE_URL +
        `?key=${API_KEY}&q=${query}
            &image_type=${query_options.imageType}
            &orientation=${query_options.orientation}
            &safesearch=${query_options.safeSearch}
            &pretty=${query_options.pretty}
            &page=${pageParam}
            &per_page=${query_options.perPage}`
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  fetchApiAsync,
};
