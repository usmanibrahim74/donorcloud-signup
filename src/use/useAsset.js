export function useAsset(){

    const getAsset = (asset) =>{
        const url = window.SynergiAssetURL+asset;
        return url
    }

    return {
        getAsset
    }
}