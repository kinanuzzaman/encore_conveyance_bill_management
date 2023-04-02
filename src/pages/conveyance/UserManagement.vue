<template>
  <!-- class="bg-[url('../assets/home/bg.png')] bg-no-repeat bg-cover" -->
  <main>
    <!-- Section Name -->
    <section class="mx-4 py-6 flex justify-between">
      <div
        class="text-2xl font-semibold"
        style="font-family: 'Roboto Slab', serif"
      >
        User Management
      </div>
      <div>
        <q-btn
          color="orange"
          @click="confirm = true"
          class="rounded-lg"
          unelevated
          icon="add"
          label="Add User"
        />
      </div>
    </section>
    <!-- Table -->
    <div class="grid md:grid-cols-3 grid-cols-1">
      <section class="col-span-2">
        <div class="q-px-md">
          <!-- bordered  style="background-color: #f1f1f1" -->
          <q-table
            flat
            class="h-[85vh] bg-transparent"
            :rows="rows"
            :columns="columns"
          >
            <template v-slot:body="props">
              <q-tr class="bg-transparent" :props="props">
                <q-td
                  key="role"
                  :props="props"
                  @click="openDialog = true"
                  class=""
                >
                  <div class="tw-py-1 tw-rounded-md">
                    <div class="flex items-center gap-4">
                      <div>
                        <q-avatar font-size="40px" icon="account_circle" />
                      </div>
                      <div>
                        <div class="text-xs">{{ props.row.name }}</div>
                        <div class="text-xs">{{ props.row.email }}</div>
                      </div>
                    </div>
                  </div>
                </q-td>
                <q-td
                  key="role"
                  :props="props"
                  @click="openDialog = true"
                  class=""
                >
                  {{ props.row.status }}
                </q-td>
                <q-td
                  key="role"
                  :props="props"
                  @click="openDialog = true"
                  class=""
                >
                  <div class="bg-blue-200 inline p-2 text-blue-800">
                    {{ props.row.role }}
                  </div>
                </q-td>
                <q-td>
                  <div class="column items-end">
                    <q-fab
                      square
                      flat
                      padding="none"
                      text-color="black"
                      icon="add"
                      direction="left"
                      class="border border-black"
                    >
                      <q-fab-action
                        flat
                        @click="confirm = true"
                        icon="edit"
                        class="bg-transparent shadow-none text-blue-500"
                      >
                        <q-tooltip
                          class="bg-blue-6 text-xs"
                          anchor="top middle"
                          self="center middle"
                          :offset="[10, 10]"
                        >
                          Edit
                        </q-tooltip>
                      </q-fab-action>
                      <q-fab-action
                        flat
                        @click="onClick"
                        icon="block"
                        class="bg-transparent shadow-none text-red-500"
                      >
                        <q-tooltip
                          class="bg-blue-6 text-xs"
                          anchor="top middle"
                          self="center middle"
                          :offset="[10, 10]"
                        >
                          Suspend User
                        </q-tooltip>
                      </q-fab-action>
                      <q-fab-action
                        flat
                        @click="onClick"
                        icon="delete"
                        class="bg-transparent shadow-none text-red-700"
                      >
                        <q-tooltip
                          class="bg-blue-6 text-xs"
                          anchor="top middle"
                          self="center middle"
                          :offset="[10, 10]"
                        >
                          Delete
                        </q-tooltip>
                      </q-fab-action>
                      <q-fab-action
                        flat
                        @click="onClick"
                        icon="lock"
                        class="bg-transparent shadow-none text-gray-700"
                      >
                        <q-tooltip
                          class="bg-blue-6 text-xs"
                          anchor="top middle"
                          self="center middle"
                          :offset="[10, 10]"
                        >
                          Lock
                        </q-tooltip>
                      </q-fab-action>
                    </q-fab>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </section>
      <section class="q-px-md">
        <q-card flat class="h-[85vh] bg-transparent">
          <div class="flex justify-center py-10">
            <q-avatar
              size="100px"
              font-size="52px"
              color="teal"
              text-color="white"
              icon="account_circle"
            />
          </div>
          <q-card-section>
            <q-input
              outlined
              v-model="name"
              placeholder="Name"
              bg-color="white"
              :dense="true"
            />
          </q-card-section>
          <q-card-section>
            <q-input
              outlined
              v-model="designation"
              placeholder="Designation"
              bg-color="white"
              :dense="true"
            />
          </q-card-section>
          <q-card-section>
            <q-select
              class="bg-white"
              outlined
              v-model="model"
              :options="options"
              :dense="true"
              label="Select role"
            />
          </q-card-section>
          <q-card-actions
            align="center"
            class="px-3 py-5 absolute bottom-0 w-full"
          >
            <q-btn label="Create" color="green" class="col" />
            <q-btn label="Decline" color="negative" class="col" />
          </q-card-actions>
        </q-card>
      </section>
    </div>

    <q-dialog v-model="confirm">
      <q-card class="my-card w-96">
        <div class="flex justify-center py-10">
          <q-avatar
            size="100px"
            font-size="52px"
            color="teal"
            text-color="white"
            icon="account_circle"
          />
        </div>
        <q-card-section>
          <q-input
            outlined
            v-model="name"
            placeholder="Name"
            bg-color="white"
            :dense="true"
          />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            v-model="designation"
            placeholder="Designation"
            bg-color="white"
            :dense="true"
          />
        </q-card-section>
        <q-card-section>
          <q-select
            class="bg-white"
            outlined
            v-model="model"
            :options="options"
            :dense="true"
            label="Select role"
          />
        </q-card-section>
        <q-card-actions align="center" class="row mx-2 py-5">
          <q-btn label="Create" color="green" class="col" />
          <q-btn label="Decline" color="negative" class="col" />
        </q-card-actions>
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
    label: "User",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
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
    label: "Role",
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
    email: "demo@email.com",
    status: "Active",
    role: "Manager Author Connect",
  },
  {
    name: "Frozen Yogurt",
    email: "demo@email.com",
    status: "Active",
    role: "Manager Author Connect",
  },
  {
    name: "Frozen Yogurt",
    email: "demo@email.com",
    status: "Active",
    role: "Manager Author Connect",
  },
  {
    name: "Frozen Yogurt",
    email: "demo@email.com",
    status: "Active",
    role: "Manager Author Connect",
  },
  {
    name: "Frozen Yogurt",
    email: "demo@email.com",
    status: "Active",
    role: "Manager Author Connect",
  },
  {
    name: "Frozen Yogurt",
    email: "demo@email.com",
    status: "Active",
    role: "Manager Author Connect",
  },
  {
    name: "Frozen Yogurt",
    email: "demo@email.com",
    status: "Active",
    role: "Manager Author Connect",
  },
];
export default {
  setup() {
    let confirm = ref(false);
    return {
      rows,
      columns,
      confirm,
      model: ref(null),
      name: ref(null),
      designation: ref(null),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      val: ref(true),
    };
  },
};
</script>

<style lang="scss" scoped>
.searchContantBack {
  background-color: #f1f1f1;
}

.input-label {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 10px;
  margin-top: 24px;
  opacity: 0.5;
}

.overlay {
  // position: fixed;
  // display: none;
  // width: 100%;
  // height: 100%;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: -1;
  cursor: pointer;
}
</style>
