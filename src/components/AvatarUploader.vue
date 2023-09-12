<template>
  <div class="container">
    <div class="avatar-upload">
      <div class="avatar-edit">
        <input @change="handleImageChange($event)" type="file" id="imageUpload" accept=".png, .jpg, .jpeg" />
        <label for="imageUpload"></label>
      </div>
      <div class="avatar-preview">
        <div ref="imagePreview" id="imagePreview" :style="{ backgroundImage: 'url(' + imageUrl + ')' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted, watch } from 'vue';
import { useQuasar } from "quasar";

const props = defineProps({
  image: {
    type: String,
    default: null,
  },
});

const $q = useQuasar();

const emit = defineEmits(["imageSelected"]);
const imageUrl = ref('https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-512.png');

onMounted(() => {
  if (props.image) imageUrl.value = props.image;
});

watch(() => props.image, (val) => {
  if (val) imageUrl.value = val;
});

function handleImageChange(input) {
  if (input.target.files && input.target.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageUrl.value = e.target.result;
      if (input.target.files[0].size > (3 * 1024 * 1024)) {
        $q.notify({
          color: 'negative',
          message: 'File size exceeded',
          icon: 'report_problem',
        });
      } else emit('imageSelected', input.target.files[0]);
    };
    reader.readAsDataURL(input.target.files[0]);
  }
}
</script>

<style lang="scss" scoped>
.avatar-upload {
  position: relative;
  max-width: 205px;
  margin: 24px auto;

  .avatar-edit {
    position: absolute;
    right: 40px;
    z-index: 1;
    top: 40px;

    input {
      display: none;

      +label {
        display: inline-block;
        width: 34px;
        height: 34px;
        margin-bottom: 0;
        border-radius: 100%;
        background: #00dc52;
        border: 1px solid transparent;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
        cursor: pointer;
        font-weight: normal;
        transition: all .2s ease-in-out;

        &:hover {
          background: #f1f1f1;
          border-color: #d6d6d6;
        }

        &:after {
          content: "\f040";
          font-family: 'FontAwesome';
          color: #757575;
          position: absolute;
          top: 10px;
          left: 0;
          right: 0;
          text-align: center;
          margin: auto;
        }
      }
    }
  }

  .avatar-preview {
    width: 192px;
    height: 192px;
    position: relative;
    border-radius: 100%;
    // border: 1px solid #00dc52;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);

    >div {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}
</style>
