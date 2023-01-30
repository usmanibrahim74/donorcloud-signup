export function useCurrency(){
    const formatAmount = (amount) =>{
        amount = parseFloat(amount);
        if(!amount){
            amount = 0;
        }
        return `${currency_symbol} ${amount.toFixed(2)}`
    }
    const currency_symbol = "£";
    const currency_code = "GBP";

    return {
        currency_symbol,
        currency_code,
        formatAmount
    }
}