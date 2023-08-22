<template lang="">
<p class="text-red-400 font-bold text-xs m-0">{{ message }}</p>
</template>
<script>
export default {
    props:{
        message:{
            type:String,
            default:"This field has an error."
        }
    }
}
</script>
<style lang="">
    
</style>