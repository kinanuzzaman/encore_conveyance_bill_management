<template>
  <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
    <!--  elevated -->
    <q-header
      flat
      class="bg-white p-2"
      style="font-family: 'Roboto Slab', serif"
    >
      <q-toolbar>
        <!-- <q-btn
          flat
          color="green"
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
        /> -->
        <q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" v-if="!drawer">
            <img
              src="../assets/images/login/encore1.png"
              class="h-[26px] w-[169px]"
            />
          </q-btn>
        </q-toolbar-title>
        <q-btn
          round
          color="green"
          icon="account_circle"
          @click="onClick"
          class="text-white"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="230"
      :breakpoint="500"
      bordered
      class="bg-green rounded-tr-xl"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item>
            <q-item-section class="pt-3">
              <q-btn flat @click="drawer = !drawer" v-if="drawer">
                <img
                  src="../assets/images/home/encore_white.png"
                  class="h-[26px] w-[169px]"
                />
              </q-btn>
            </q-item-section>
          </q-item>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section avatar class="text-white">
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view />
        <div
          class="-z-10 absolute bottom-0 right-0 backdrop-opacity-10 backdrop-invert bg-white/10 w-full h-full"
        >
          <img
            src="../assets/images/home/bg.png"
            alt=""
            class="w-[800px] fixed bottom-0 right-0"
          />
        </div>
      </q-page>
    </q-page-container>
    <!-- <q-footer
      elevated
      class="bg-green"
      style="font-family: 'Roboto Slab', serif"
    >
      <q-tabs
        v-model="tab"
        class="text-white"
        align="justify"
        :inline-label="$q.screen.gt.sm"
      >
        <q-route-tab
          to="/configuration"
          class="gt-sm"
          icon="manage_accounts"
          label="Configuration"
          no-caps
        />
        <q-route-tab
          to="/cashin"
          icon="credit_card"
          label="Cash request"
          no-caps
        />
        <q-route-tab
          name="Expense"
          icon="account_balance_wallet"
          label="Expense"
          no-caps
        />
        <q-route-tab
          name="Analytics"
          icon="donut_small"
          label="Analytics"
          no-caps
        />
      </q-tabs>
    </q-footer> -->
  </q-layout>
</template>

<script>
import { ref } from "vue";

const menuList = [
  {
    icon: "inbox",
    label: "Inbox",
    separator: true,
  },
  {
    icon: "send",
    label: "Outbox",
    separator: false,
  },
  {
    icon: "delete",
    label: "Trash",
    separator: false,
  },
  {
    icon: "error",
    label: "Spam",
    separator: true,
  },
  {
    icon: "settings",
    label: "Settings",
    separator: false,
  },
  {
    icon: "feedback",
    label: "Send Feedback",
    separator: false,
  },
  {
    icon: "help",
    iconColor: "primary",
    label: "Help",
    separator: false,
  },
];

export default {
  setup() {
    return {
      tab: ref("configuration"),
      drawer: ref(false),
      menuList,
    };
  },
};
</script>

<style lang="scss" scoped></style>
