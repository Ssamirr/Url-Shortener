import axios from "axios";
import { url } from "../model/Url";

export class IUrlService {
    async getİnfo(url: string): Promise<url> {
        let response = await axios.get(`https://api.shrtco.de/v2/shorten?url=${url}`);
        let shortUrl: url = response.data.result
        return shortUrl;
    }
}