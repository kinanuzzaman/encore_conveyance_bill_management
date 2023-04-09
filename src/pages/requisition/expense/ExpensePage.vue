<template>
  <!-- class="bg-[url('../assets/home/bg.png')] bg-no-repeat bg-cover" -->
  <main>
    <!-- Section Name  style="font-family: 'Roboto Slab', 'serif'"-->
    <section class="mx-4 py-6 flex justify-between">
      <div class="text-2xl font-semibold">Expense</div>

      <div>
        <q-btn outline rounded to="/expense/add-expense" class="rounded-lg" label="Add Expense" no-caps />
      </div>
    </section>
    <!-- Table -->
    <!-- grid md:grid-cols-3 grid-cols-1 -->
    <div class="">
      <section class="">
        <div class="q-px-md">
          <!-- bordered  style="background-color: #f1f1f1" -->
          <q-table flat class="h-[85vh]" :rows="rows" :columns="columns" style="background: rgba(244, 244, 244, 0.8)"
            :selected-rows-label="getSelectedString" selection="multiple" v-model:selected="selected" row-key="name">
            <template v-slot:body="props">
              <q-tr class="" :props="props">
                <q-td key="role" row-key="name" :props="props" @click="openDialog = true" class="">

                  <div>
                    <q-checkbox left-label v-model="props.row" />
                  </div>

                </q-td>
                <q-td key="role" :props="props" @click="openDialog = true" class="">

                  <div>
                    <div class="text-xs">{{ props.row.name }}</div>
                  </div>

                </q-td>
                <q-td key="role" :props="props" class="">
                  <div>
                    <div class="text-xs">{{ props.row.email }}</div>
                  </div>
                </q-td>
                <q-td key="role" :props="props" class="">
                  <div>
                    <div class="text-xs">{{ props.row.phone }}</div>
                  </div>
                </q-td>
                <q-td key="role" :props="props" class="">
                  <div>
                    <div class="text-xs">{{ props.row.created }}</div>
                  </div>
                </q-td>
                <q-td key="role" :props="props" @click="openDialog = true" class="">
                  {{ props.row.status }}
                </q-td>
                <q-td key="role" :props="props" @click="openDialog = true" class="">
                  <div class="bg-blue-200 inline p-2 text-blue-800">
                    {{ props.row.role }}
                  </div>
                </q-td>
                <q-td>
                  <div class="column items-end">
                    <q-btn flat icon="more_vert">
                      <q-menu anchor="top middle" self="top right">
                        <q-item clickable>
                          <q-item-section>Update</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>Delete</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>Update Status</q-item-section>
                        </q-item>
                      </q-menu>
                    </q-btn>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </section>
    </div>

    <q-dialog v-model="confirm" class="">
      <q-card class="my-card p-10" style="width: 1020px; max-width: 80vw">
        <div class="flex justify-center py-10">
          <q-avatar size="100px" font-size="52px" color="teal" text-color="white" icon="account_circle" />
        </div>
        <q-card-section class="grid grid-cols-2 gap-5">
          <q-input outlined v-model="name" placeholder="First Name" bg-color="white" :dense="true" />
          <q-input outlined v-model="name" placeholder="Last Name" bg-color="white" :dense="true" />
          <q-input outlined v-model="text" placeholder="Email" :dense="true">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input outlined v-model="text" placeholder="Phone Number" :dense="true">
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
          <q-input outlined v-model="designation" placeholder="Designation" bg-color="white" :dense="true" />
          <q-select class="bg-white" outlined v-model="model" :options="options" :dense="true" label="Select role" />
          <q-input outlined v-model="designation" placeholder="Salary" bg-color="white" :dense="true" />
          <q-btn label="Save" color="green" class="col" />
        </q-card-section>
        <!-- <q-card-actions align="center" class="row mx-2 py-5">
          <q-btn label="Create" color="green" class="col" />
          <q-btn label="Decline" color="negative" class="col" />
        </q-card-actions> -->
      </q-card>
    </q-dialog>
  </main>
</template>

<script>
import { ref } from "vue";

const columns = [
  {
    name: "user",
    required: true,
    label: "Request Type",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "email",
    align: "left",
    label: "Amount",
    field: "email",
    sortable: true,
  },
  {
    name: "phone",
    align: "left",
    label: "Paid By",
    field: "phone",
    sortable: true,
  },
  {
    name: "created",
    align: "left",
    label: "User",
    field: "created",
    sortable: true,
  },
  {
    name: "status",
    align: "left",
    label: "Status",
    field: "status",
    sortable: true,
  },
  {
    name: "role",
    align: "left",
    label: "Approvals",
    field: "role",
  },
  {
    name: "action",
    label: "Action",
    field: "action",
  },
];

const rows = [
  {
    name: "Frozen Yogurt",
    designation: "Manager",
    email: "demo@email.com",
    phone: "1234567890",
    created: "12 March 2023",
    role: "Manager Author Connect",
    status: "Active",
  },
  {
    name: "Frozen Yogurt",
    designation: "Manager",
    email: "demo@email.com",
    phone: "1234567890",
    created: "12 March 2023",
    role: "Manager Author Connect",
    status: "Active",
  },
  {
    name: "Frozen Yogurt",
    designation: "Manager",
    email: "demo@email.com",
    phone: "1234567890",
    created: "12 March 2023",
    role: "Manager Author Connect",
    status: "Active",
  },
];
export default {
  setup() {
    const selected = ref([])
    let confirm = ref(false);
    return {
      selected,
      columns,
      rows,
      confirm,
      model: ref(null),
      name: ref(null),
      designation: ref(null),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      val: ref(true),
      getSelectedString() {
        return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.length}`
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.q-th {
  background-color: #00b4ff;
}
</style>
