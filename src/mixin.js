export default {


    methods:{
        $formatAmount(amount){
            amount = parseFloat(amount);
            if(!amount){
                amount = 0;
            }
            return `$ ${amount.toFixed(2)}`
        },
        $getAsset(asset){
            const url = window.SynergiAssetURL+asset;
            return url
        }
    }
}