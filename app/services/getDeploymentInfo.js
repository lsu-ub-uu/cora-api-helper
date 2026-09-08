import { getApiUrl } from "../utils/searchParams.js";

export default async function getDeploymentInfo() {
    const response = await fetch(getApiUrl() + '/', {
        headers: {
            "Accept": "application/vnd.cora.deploymentInfo+json",
        }
    });
    
    return response.json();
}