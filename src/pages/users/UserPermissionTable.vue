<template>
  <!-- class="bg-[url('../assets/home/bg.png')] bg-no-repeat bg-cover" -->
  <main>
    <!-- Section Name  style="font-family: 'Roboto Slab', 'serif'"-->
    <section class="mx-4 py-6 flex justify-between">
      <div class="flex items-center gap-3">
        <span class="text-2xl font-semibold ">{{ togglePermMode ? 'General' : 'System' }} Permission Control</span>

        <q-btn title="Swap to System" color="green" v-if="togglePermMode" @click="togglePermMode = false" no-caps
          class="rounded-lg" flat icon="swap_vert" />
        <q-btn title="Swap to General" color="red" v-if="!togglePermMode" @click="togglePermMode = true" no-caps
          class="rounded-lg" flat icon="swap_vert" />
      </div>

      <div class="flex gap-3">
        <q-btn color="red" @click="$router.back()" no-caps class="rounded-lg" unelevated label="Back" />
        <q-btn color="green" v-if="authStore.canAccess('role_write') && authStore.canAccess('access_control')"
          :loading="save_btn_loading" @click="savePermissions()" no-caps class="rounded-lg" unelevated label="Save" />
      </div>
    </section>
    <!-- Table -->
    <!-- grid md:grid-cols-3 grid-cols-1 -->
    <div class="">
      <section class="">
        <div class="q-px-md gt-sm">
          <!-- bordered  style="background-color: #f1f1f1" props.row[item].isAssigned-->
          <q-table v-if="togglePermMode" flat class="h-[80vh]" :rows="rows.general_perms" :loading="loading"
            :columns="columns" style="background: rgba(244, 244, 244, 0.8)" :rows-per-page-options="[15]">
            <template v-slot:body="props">
              <q-tr class="" :props="props">
                <q-td v-for="(item) in Object.keys(props.row)" :key="props.row[item]">
                  <q-toggle v-if="item != 'title'" :val="props.row[item]._id" v-model="assignedPerms" checked-icon="check"
                    color="red" unchecked-icon="clear" />
                  <span v-else>{{ props.row[item] }}</span>
                </q-td>
              </q-tr>
            </template>
          </q-table>
          <div v-else class="grid grid-cols-3 gap-3">
            <q-card class="w-full h-full">
              <q-card-section>
                <div v-for="(perm, i) in rows.system_perms" :key="i" class="flex justify-between">
                  <div class="flex flex-col gap-2">
                    <span class="text-2xl">{{ perm.perm_name }}</span>
                    <span class="text-gray-600">{{ perm.perm_description }}</span>
                  </div>
                  <q-toggle v-if="item != 'title'" size="xl" :val="perm._id" v-model="assignedPerms" checked-icon="check"
                    color="red" unchecked-icon="clear" />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { ApiService } from 'src/service/api-service';
import { useRoute } from "vue-router";
import { useAuthStore } from "src/stores/auth.store";
const columns = [
  {
    name: "role",
    label: "Title",
    align: "left",
    field: "title",
    sortable: true,
  },
  {
    name: "read",
    align: "left",
    label: "Read",
    field: "read",
    sortable: true,
  },
  {
    name: "create",
    align: "left",
    label: "Create",
    field: "create",
    sortable: true,
  },
  {
    name: "write",
    align: "left",
    label: "Write",
    field: "write",
    sortable: true,
  },
];

const assignedPerms = ref([]);

const apiSerivce = new ApiService();
const $q = useQuasar();
const $route = useRoute();

const authStore = useAuthStore();

const togglePermMode = ref(true);


const rows = ref([])
const loading = ref(false)
const save_btn_loading = ref(false)

onMounted(async () => {
  loading.value = true
  await fatchGroupedPermissions();
  loading.value = false
});

async function fatchGroupedPermissions() {
  try {
    const res = await apiSerivce.get(`/rbac/grouped-role-permissions/${$route.params.id}`);
    rows.value = res.data.data;
    assignedPerms.value = res.data.data.assigned_perm_ids
  } catch (error) {
    $q.notify({
      message: error.response ? error.response.data.message : error.message,
      color: "negative",
      position: "top",
    });
  }
}

async function savePermissions() {
  try {
    save_btn_loading.value = true
    await apiSerivce.post('/rbac/roles/assign-permissions', {
      role_id: $route.params.id,
      permission_ids: assignedPerms.value,
    })
    save_btn_loading.value = false
    $q.notify({
      message: "Role updated",
      color: "positive",
      position: "top",
    });
    fatchGroupedPermissions();
  } catch (error) {
    $q.notify({
      message: err.response ? err.response.data.message : err.message,
      color: "negative",
      position: "top",
    });
  }
}

</script>

<style lang="scss" scoped></style>
