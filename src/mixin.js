export default {


    methods:{
        $formatAmount(amount){
            amount = parseFloat(amount);
            if(!amount){
                amount = 0;
            }
            return `$ ${amount.toFixed(2)}`
        }
    }
}