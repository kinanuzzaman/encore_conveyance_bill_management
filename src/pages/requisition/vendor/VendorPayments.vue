<template>
    <section class="mx-4 my-6 flex justify-between">
        <div class="text-2xl font-semibold">Vendor Payment</div>
        <div class="flex md:gap-x-5 gap-1 justify-items-end">
            <div> <q-btn-dropdown outline rounded label="Action" icon="edit">
                    <q-list>
                        <q-item clickable v-close-popup @click="onItemClick">
                            <q-item-section>
                                <q-item-label>Photos</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="onItemClick">
                            <q-item-section>
                                <q-item-label>Videos</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="onItemClick">
                            <q-item-section>
                                <q-item-label>Articles</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown></div>
            <div class="md:w-[200px]">
                <q-select rounded outlined dense v-model="model" :options="options" label="Select">
                    <template v-slot:prepend>
                        <q-icon name="filter_alt_off" />
                    </template>
                </q-select>
            </div>
            <div> <q-btn outline rounded to="/vendor/add-vendor" label="Add vendor" no-caps />

            </div>
        </div>
    </section>
    <section>
        <div class="q-px-md gt-sm">
            <q-table flat class="h-[85vh]" :rows="rows" :columns="columns" style="background: rgba(244, 244, 244, 0.8)"
                :selected-rows-label="getSelectedString" selection="multiple" v-model:selected="selected" row-key="name">
                <!-- <template v-slot:top-right>
            <q-btn color="primary" label="Action" :disable="selectedItems.length === 0" @click="performAction" />
        </template> -->
                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td>
                            <q-checkbox v-model="props.selected" />
                        </q-td>
                        <q-td>

                            <div>
                                <div class="text-xs">{{ props.row.name }}</div>
                            </div>

                        </q-td>
                        <q-td>
                            <div>
                                <div class="text-xs">{{ props.row.email }}</div>
                            </div>
                        </q-td>
                        <q-td>
                            <div>
                                <div class="text-xs">{{ props.row.phone }}</div>
                            </div>
                        </q-td>
                        <q-td>
                            <div>
                                <div class="text-xs">{{ props.row.created }}</div>
                            </div>
                        </q-td>
                        <q-td>
                            {{ props.row.status }}
                        </q-td>
                        <q-td>
                            {{ props.row.status }}
                        </q-td>
                        <q-td>
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
        <!-- mobile table -->
        <div class="q-pa-md lt-md">
            <q-table :rows="rows" :columns="columns" row-key="name" selection="multiple" v-model:selected="selected"
                :filter="filter" grid hide-header>
                <!-- <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template> -->

                <template v-slot:item="props">
                    <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                        :style="props.selected ? 'transform: scale(0.95);' : ''">
                        <q-card bordered flat :class="props.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''">
                            <q-card-section class="flex justify-between">
                                <q-checkbox dense v-model="props.selected" :label="props.row.name" />
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
                            </q-card-section>
                            <q-separator />
                            <q-list dense>
                                <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                                    <q-item-section>
                                        <q-item-label v-if="col.label != 'Action'">{{ col.label }}</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-item-label caption>{{ col.value }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-card>
                    </div>
                </template>

            </q-table>
        </div>
    </section>
</template>
  
<script>
import { ref } from 'vue';

export default {
    setup() {

        return {

            columns: [
                {
                    name: "user",
                    required: true,
                    label: "Vendor",
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
                    label: "Created On",
                    field: "created",
                    sortable: true,
                },
                {
                    name: "location",
                    align: "left",
                    label: "Location",
                    field: "location",
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
            ],

            rows: [
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
                    name: "Frozen ",
                    designation: "Manager",
                    email: "demo@email.com",
                    phone: "1234567890",
                    created: "12 March 2023",
                    role: "Manager Author Connect",
                    status: "Active",
                },
                {
                    name: "Yogurt",
                    designation: "Manager",
                    email: "demo@email.com",
                    phone: "1234567890",
                    created: "12 March 2023",
                    role: "Manager Author Connect",
                    status: "Active",
                },
            ],
            selected: ref([]),
        };
    },



};
</script>
  