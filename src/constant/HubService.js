import axios from "axios";

const HOST = 'http://ugoplix.duckdns.org/api/v1/'
// const HOST = "http://localhost:8080";
const HUB = "/hub";
const BACKEND_API_URL = HOST + HUB;
const ALL_DOCKER_PAGE1 = "/alldockers";
const TAGS = "/containers/tags"

class HubService {
    getFullList() {
        return axios.get(BACKEND_API_URL + ALL_DOCKER_PAGE1);
    }

    async returnTagsFromLibrary(library) {
        return await axios.post(BACKEND_API_URL + TAGS, "library=" + library)
            .then(function (response) {
                return response;
            }).catch(function (error) {
                console.log(error);
            });
    }

}

export default new HubService()
