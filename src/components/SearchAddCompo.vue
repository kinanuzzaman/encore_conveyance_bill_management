<template>
  <div>
    <q-select v-model="selectedOption" @input="onOptionSelect" :label="`${$props.label}`" dense outlined
      option-label="label" option-value="value" :options="suggestedOptions" use-input @input-value="onFilter"
      :loading="loadingOptions" :no-options-label="noOptionsLabel">
      <template v-slot:append>
        <q-icon v-if="selectedOption" name="close" @click.stop.prevent="selectedOption = null" class="cursor-pointer" />
      </template>
      <template v-slot:no-option>
        <q-item>
          <q-item-section>
            <div v-if="searchQuery !== ''" class="flex items-center justify-between w-full">
              <span>{{ searchQuery }}</span>
              <q-btn color="primary" icon="add" label="Add" no-caps outline unelevated @click="requestNewData" />
            </div>
            <div v-else>
              No results found.
            </div>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
import { ApiService } from 'src/service/api-service';
export default {
  data() {
    return {
      searchQuery: '', // Search query entered by user
      suggestedOptions: [], // Array of suggested options
      selectedOption: null, // Currently selected option
      loadingOptions: false, // Boolean flag to indicate if options are being loaded
      datas: [],
      apiService: new ApiService(),
    };
  },
  props: {
    api: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    userType: {
      type: String,
      enum: [ "CLIENT", "VENDOR" ],
      required: false
    },
    createApi: {
      type: String,
      required: false
    },
  },
  watch: {
    selectedOption: {
      handler: function (val) {
        console.log('Selected option:', val);
        if (val && val.value) this.$emit('selected', val.value);
      },
      deep: true
    }
  },
  methods: {
    onOptionSelect(option) {
      console.log('Selected option:', option);
      this.$emit('selected', option);
    },
    onFilter(val) {
      this.searchQuery = val;

      if (val.length >= 1) {
        this.fetchSuggestions(this.searchQuery);
      } else {
        this.fetchSuggestions();
      }
    },
    async fetchSuggestions(searchQuery) {
      try {
        this.loadingOptions = true;
        if (!this.$props.api && !this.$props.createApi) return
        const api = this.$props.createApi ? this.$props.createApi : this.$props.api
        console.log("🚀 ~ file: SearchAddCompo.vue:86 ~ fetchSuggestions ~ api:", api)
        const response = await this.apiService.get(api, {
          params: {
            q: searchQuery
          }
        });
        this.suggestedOptions = response.data.data.map((item) => {
          return {
            label: item.title || item.first_name + ' ' + item.last_name,
            value: item._id
          };
        });
        this.loadingOptions = false;
      } catch (error) {
        console.log(error);
        this.loadingOptions = false;
      }
    },
    async requestNewData() {
      try {
        let payload = {
          title: this.searchQuery,
          isRequested: true
        }
        if (this.$props.userType) {
          payload = {
            user_type: this.$props.userType,
            name: this.searchQuery,
          }
        }
        const api = this.$props.createApi || `/${this.$props.api}/create`
        await this.apiService.post(api, payload);
        await this.fetchSuggestions();
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          message: error.response ? error.response.data.message : error.message,
          position: 'top',
          icon: 'report_problem'
        });
      }
    }
  },
  mounted() {
    this.fetchSuggestions();
  },
  computed: {
    noOptionsLabel() {
      return this.loadingOptions ? 'Loading options...' : 'No options available';
    }
  }
};
</script>
