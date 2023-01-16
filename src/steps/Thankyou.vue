<template lang="">
    <div class="flex flex-col items-center gap-6 my-14">
        <CheckBadgeIcon class="max-w-[150px] w-full text-green-500" />
        <div class="text-center text-xl font-medium flex flex-col gap-6">
            <p>Thank You!</p>
            <p>Your Donation is successful!</p>
        </div>
    </div>
</template>
<script>
import { CheckBadgeIcon } from "@heroicons/vue/20/solid";

export default {
    components:{
        CheckBadgeIcon
    }
}
</script>
<style lang="">
    
</style>