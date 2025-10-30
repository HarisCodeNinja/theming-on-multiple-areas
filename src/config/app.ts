import { ILanguage } from "@/interface/common";

const appConfig = {
    BASE_URL: 'http://localhost:8000',
    FILE_PATH: 'http://localhost:8000/public/',
    ENVIRONMENT : 'development',
    PERSIST_STORE_NAME : 'boilerplate',
	CACHE_TOKEN: 'db5ddbc5-b762-4c7e-b464-ac23d587d3e2'

}

export const AVAILABLE_LANGUAGES : ILanguage [] = [
	{
		 "code": "en",
		 "dir" : "ltr"
	}
]

export const {ENVIRONMENT, PERSIST_STORE_NAME,BASE_URL, FILE_PATH, CACHE_TOKEN} = appConfig;
export default appConfig;