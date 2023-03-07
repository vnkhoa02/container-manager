import axios from "axios";

const HOST = 'http://ugoplix.duckdns.org/api/v1'
// const HOST = "http://localhost:8080";

const HUB = "/hub";
const BACKEND_API_URL = HOST + HUB;
const ALL_DOCKER_PAGE1 = "/containers/all";
const CONTAINERS = "/containers"
const TAGS = "/tags"
const AUTO_FILL = "/autofill";
const GENERATE_COMPOSE_FILE = "/docker/generate/composefile";

class HubService {
    getFullList() {
        return axios.get(BACKEND_API_URL + ALL_DOCKER_PAGE1);
    }

    async returnTagsFromLibrary(library) {
        return await axios.post(BACKEND_API_URL + `${CONTAINERS}/${library}` + TAGS)
            .then(function (response) {
                return response;
            }).catch(function (error) {
                console.log(error);
            });
    }

    async autofillConfig(container) {
        return await axios.post(BACKEND_API_URL + `${CONTAINERS}/${container}` + AUTO_FILL)
            .then(response => {
                return response
            }).catch(error => {
                console.error(error)
            })
    }

    async generateComposeFile(payload) {
        return await axios.post(HOST + GENERATE_COMPOSE_FILE, payload)
            .then(response => {
                return response
            }).catch(error => {
                console.error(error)
            })
    }
}

export default new HubService()
