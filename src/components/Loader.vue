<template>
    <div
      class="
        absolute
        bg-gray-400 bg-opacity-80
        z-10
        h-full
        w-full
        left-0
        top-0
        flex
        items-center
        justify-center
      "
    >
      <div class="flex items-center">
        <span class="text-3xl mr-4">{{ message }}</span>
        <!-- loading icon -->
        <svg
          class="animate-spin h-5 w-5 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <!-- end loading icon -->
      </div>
    </div>
  </template>
  <script>
  export default {
    name: 'Loader',
    props: {
      message: {
        type: String,
        default: 'Loading'
      }
    }
  }
  </script>
  