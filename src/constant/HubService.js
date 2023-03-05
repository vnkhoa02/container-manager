import axios from "axios";

const HOST = 'http://ugoplix.duckdns.org/api/v1'
// const HOST = "http://localhost:8080";

const HUB = "/hub";
const BACKEND_API_URL = HOST + HUB;
const ALL_DOCKER_PAGE1 = "/alldockers";
const TAGS = "/containers/tags"
const AUTO_FILL = "/container/autofill";
const GENERATE_COMPOSE_FILE = "/docker/generate/composefile";

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

    async autofillConfig(container) {
        return await axios.post(BACKEND_API_URL + AUTO_FILL + `?container=${container}`)
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
