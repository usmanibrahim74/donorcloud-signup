export default {


    methods:{
        $formatAmount(amount){
            if(!amount){
                amount = 0;
            }
            return `$ ${amount.toFixed(2)}`
        }
    }
}