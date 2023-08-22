<template lang="">
  <div>
    <label v-if="hasLabel" class="text-sm text-black font-medium" :for="uid">{{
      label
    }}</label>
    <v-select
      :options="options"
      @search="handleSearch"
      label="charity_name"
      :placeholder="placeholder"
      v-model="model"
      class="h-[42px]"
      :class="[hasError ? 'hasError' : '']"
    >
    <template #selected-option="{ charity_name, reg_charity_number }">
      {{ reg_charity_number  }}
    </template>
    <template #option="{ charity_name, reg_charity_number }">
      <div style="display: flex; align-items: baseline">
        <strong class="text-xs">{{ charity_name }}</strong>
        <em style="margin-left: 0.5rem">({{ reg_charity_number  }})</em>
      </div>
    </template>
    </v-select>
    <HasError class="mt-1" v-if="hasError" :message="message" />
  </div>
</template>
<script>
import HasError from "./HasError.vue";
import { computed } from "@vue/reactivity";
import { uuid } from "vue-uuid";

export default {
  components: {
    HasError,
  },
  props: {
    modelValue: {
      required: true,
    },
    placeholder: {
      type: String,
      default: "Enter",
    },
    errors: {
      default: false,
    },
    field: {
      type: String,
      default: "",
    },
    fields: {
      type: Array,
      default: [],
    },
    label: {
      default: "",
    },
    options: {
      type: Array,
      default: [
        {
          name: "Usman",
        },
      ],
    },
  },
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    const hasLabel = computed({
      get: () => props.label && props.label != "",
    });
    const hasError = computed({
      get: () => {
        if (props.field) {
          return props.errors?.get(props.field);
        }
        if (props.fields) {
          let index = props.fields.findIndex((field) =>
            props.errors?.has(field)
          );

          console.log(index);
          return index > -1 ? true : false;
        }
      },
    });
    const message = computed({
      get: () => {
        if (props.field) {
          return props.errors?.get(props.field);
        }
        if (props.fields) {
          let index = props.fields.findIndex((field) =>
            props.errors?.has(field)
          );
          return props.errors?.get(props.fields[index]);
        }
      },
    });
    const uid = uuid.v4();
    let debounce = 0;
    const handleSearch = (search, loading) => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        emit("search", {
          search,
          loading,
        });
      }, 500);

    };
    return {
      model,
      hasError,
      message,
      uid,
      hasLabel,
      handleSearch,
    };
  },
};
</script>
<style lang="css" scoped>
.hasError {
  --vs-border-color: rgb(248 113 113);
}
:deep() {
  --vs-controls-color: rgb(209, 213, 219);
  --vs-border-color: rgb(209, 213, 219);
  --vs-border-width: 1px;
  --vs-border-radius: 4px;

  --vs-actions-padding: 6px 14px 0 0;
  --vs-line-height: 25px;
  --vs-font-size: 14px;
  --vs-search-input-placeholder-color: rgb(209, 213, 219);
  /* --vs-search-input-color: rgb(209, 213, 219); */

  /* --vs-dropdown-bg: #282c34;
  --vs-dropdown-color: #cc99cd;
  --vs-dropdown-option-color: #cc99cd;

  --vs-selected-bg: #664cc3;
  --vs-selected-color: #eeeeee;

  --vs-search-input-color: #eeeeee;

  --vs-dropdown-option--active-bg: #664cc3;
  --vs-dropdown-option--active-color: #eeeeee; */
}
</style>

<style>
.vs__search,
.vs__search:focus {
  padding-left: 10px !important;
  border: 1px solid rgb(209, 213, 219) !important;
  border-radius: 4px !important;
}
.vs__search::placeholder {
  font-weight: 600;
}
.vs__selected{
  font-size: 14px;
}
@media only screen and (max-width: 600px) {
  .vs__selected{
    font-size: 12px;
  }
}

.hasError .vs__dropdown-toggle {
  background-color: rgb(254 242 242);
}
</style>
