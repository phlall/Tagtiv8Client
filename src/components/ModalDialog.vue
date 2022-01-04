<template>
  <teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        ref="modal-backdrop"
        class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
        v-show="showModal"
      >
        <div
          ref="modal-backdrop"
          v-if="showModal"
          class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
        >
          <BaseLayout>
            <div
              class="
                flex
                items-start
                justify-center
                min-h-screen
                pt-24
                text-center
              "
            >
              <div
                class="
                  bg-white
                  rounded-lg
                  text-left
                  overflow-hidden
                  shadow-xl
                  p-8
                  w-full
                "
                role="dialog"
                ref="modal"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div class="w-full text-right">
                  <button class="text-2xl" @click="$emit('closeModal')">
                    <font-awesome-icon :icon="['fas', 'times']" />
                  </button>
                </div>
                <div class="flex flex-wrap">
                  <div>{{ user.firstName }}</div>
                  <div>{{ user.lastName }}</div>
                  <div>{{ user.email }}</div>
                  <div>{{ user.school }}</div>
                </div>
                <div>
                  <div>{{ user.created }}</div>
                  <div>{{ user.passwordChanged }}</div>
                </div>
                <div>
                  <div v-for="logon in user.logons" :key="logon.id">
                    <div>{{ logon.logonDateTime }}</div>
                  </div>
                </div>
              </div>
            </div>
          </BaseLayout>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
const props = {
  show: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object,
  },
};
import { ref, watch } from "vue";
export default {
  name: "ModalDialog",
  props,
  emits: ["closeModel"],

  setup(props) {
    const showModal = ref(false);
    function closeModal() {
      showModal.value = false;
      this.$emit("closeModal");
    }

    watch(
      () => props.show,
      (show) => {
        showModal.value = show;
      }
    );

    return {
      showModal,
      closeModal,
    };
  },
};
</script>
