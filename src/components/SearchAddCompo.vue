<template>
  <div>
    <q-select v-model="selectedOption" @input="onOptionSelect" :label="`${$props.label}`" dense outlined
      option-label="label" option-value="value" :options="suggestedOptions" use-input @input-value="onFilter"
      :loading="loadingOptions" :no-options-label="noOptionsLabel">
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
  },
  watch: {
    selectedOption: {
      handler: function (val) {
        console.log('Selected option:', val);
        this.$emit('selected', val.value);
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

      if (val.length > 3) {
        this.loadingOptions = true;
        this.fetchSuggestions(this.searchQuery);
        this.loadingOptions = false;
      }
    },
    async fetchSuggestions(searchQuery) {
      try {
        const response = await this.apiService.get(this.$props.api, {
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
      } catch (error) {
        console.log(error);
      }
    },
    async requestNewData() {
      try {
        await this.apiService.post(`/${this.$props.api}/create`, {
          title: this.searchQuery,
          isRequested: true
        });
        await this.fetchSuggestions();
      } catch (error) {
        console.log(error);
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
