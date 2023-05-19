import { AxiosResponse } from "axios";
import apiClient from "./apiClient";

interface Entity {
    id: number;
}

class HTTPService {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll<T>(): {
        request: Promise<AxiosResponse<any, any>>;
        cancel: () => void;
    } {
        const controller = new AbortController();
        const request = apiClient.get<T[]>(this.endpoint, {
            signal: controller.signal
        });

        return {
            request,
            cancel: () => controller.abort()
        };
    }

    create<T>(entity: T): Promise<AxiosResponse<T, any>> {
        return apiClient.post<T>(this.endpoint, entity);
    }

    update<T extends Entity>(entity: T): Promise<AxiosResponse<any, any>> {
        return apiClient.patch(this.endpoint + "/" + entity.id, entity);
    }

    delete(id: number): Promise<AxiosResponse<any, any>> {
        return apiClient.delete(this.endpoint + "/" + id);
    }
}

function create(endpoint: string): HTTPService {
    return new HTTPService(endpoint);
}

export default create;
