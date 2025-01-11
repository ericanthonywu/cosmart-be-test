import axios, {AxiosError, AxiosResponse} from 'axios'
import querystring from "querystring";
import loggerUtil from "../../../util/loggerUtil";
import {ParsedUrlQuery} from "node:querystring";

const instance = axios.create({
    baseURL: process.env.OPEN_LIBRARY_URL,
});

instance.interceptors.response.use(
    (data: AxiosResponse<any, any>): any => data,
    (error: AxiosError): Promise<never> => {
        if (error.response === undefined) {
            loggerUtil.error(`open library http is unavailable, url: [${process.env.OPEN_LIBRARY_URL}`);
            return Promise.reject(error);
        }

        const parsedObject: ParsedUrlQuery = querystring.parse(error.response.config.data);
        const jsonString = JSON.stringify(parsedObject, null, 2);
        loggerUtil.error(
            `error when hitting open library api with http status ${error.response.status} url: [${error.response.config.method}] ${error.response.config.url} body: ${jsonString} error: ${JSON.stringify(error.response.data)}`,
        );

        return Promise.reject(error.response.data);
    },
);

export default instance;