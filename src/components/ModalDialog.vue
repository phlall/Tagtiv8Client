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
                font-roboto
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
                <div v-if="user">
                  <div class="w-full text-right">
                    <button class="text-2xl" @click="$emit('closeModal')">
                      <font-awesome-icon :icon="['fas', 'times']" />
                    </button>
                  </div>
                  <div
                    class="
                      flex flex-row
                      w-full
                      border-b border-red-600
                      font-bold
                      text-xl
                      pb-1
                    "
                  >
                    <div class="mr-2">{{ user.firstName }}</div>
                    <div class="flex-grow">{{ user.lastName }}</div>
                    <div class="flex-grow">{{ user.username }}</div>
                    <div class="flex-grow">{{ user.school }}</div>
                  </div>
                  <div class="flex my-4">
                    <div class="flex-grow">
                      <span class="font-bold">Created:</span>
                      {{ formatDate(user.created) }}
                    </div>
                    <div class="flex-grow">
                      <span class="font-bold"> Password last changed:</span>
                      {{ formatDate(user.passwordChanged) }}
                    </div>
                  </div>
                  <!-- <div class="flex mt-6">
                    <div>
                      <BaseButton
                        type="button"
                        @click="sortAz('month')"
                        class="flex"
                      >
                        <div class="font-bold pt-1">Month</div>
                        <div class="ml-2">
                          <font-awesome-icon
                            :icon="[
                              'fas',
                              sorted('username') ? 'caret-down' : 'caret-up',
                            ]"
                            class="text-gray-600 text-3xl"
                          />
                        </div>
                      </BaseButton>
                    </div>
                    <div>
                      <BaseButton
                        type="button"
                        @click="sortAz('year')"
                        class="flex"
                      >
                        <div class="font-bold pt-1">Year</div>
                        <div class="ml-2">
                          <font-awesome-icon
                            :icon="[
                              'fas',
                              sorted('username') ? 'caret-down' : 'caret-up',
                            ]"
                            class="text-gray-600 text-3xl"
                          />
                        </div>
                      </BaseButton>
                    </div>
                  </div> -->
                  <div class="mt-12">
                    <div
                      v-for="(logon, index0) in shapeLogonDates(user.logons)"
                      :key="index0"
                    >
                      <div class="flex w-9/12 mb-1">
                        <div class="w-48 bg-blue-200 pl-4 pt-2 flex">
                          <div class="flex-grow">{{ logon.parent }}</div>
                          <div
                            class="
                              bg-red-700
                              w-5
                              h-5
                              rounded-full
                              mr-2
                              pt-0
                              text-center text-white text-sm
                            "
                          >
                            <!-- {{ getYearLogons("year", logon.parent) }} -->
                            {{ getLogonsCount({ year: logon.parent }) }}
                          </div>
                        </div>
                        <div class="flex-grow bg-blue-100">
                          <div
                            v-for="(date, index) in shapedChildren(
                              logon.objs,
                              'month'
                            )"
                            :key="index"
                          >
                            <div class="flex">
                              <div
                                class="w-48"
                                :class="
                                  index > 0 ? 'border-t-2 border-blue-300' : ''
                                "
                              >
                                <div class="pl-4 pt-2 flex">
                                  <div class="flex-grow">{{ date.parent }}</div>
                                  <div
                                    class="
                                      bg-red-700
                                      w-5
                                      h-5
                                      rounded-full
                                      mr-2
                                      pt-0
                                      text-center text-white text-sm
                                    "
                                  >
                                    {{
                                      getLogonsCount({
                                        year: logon.parent,
                                        month: date.parent,
                                      })
                                    }}
                                  </div>
                                </div>
                              </div>
                              <div
                                class="flex-grow bg-blue-200"
                                :class="
                                  index > 0 ? 'border-t-2 border-blue-300' : ''
                                "
                              >
                                <div
                                  v-for="(day, index1) in shapedChildren(
                                    date.children,
                                    'dayInt'
                                  )"
                                  :key="index1"
                                >
                                  <div class="flex">
                                    <div
                                      :class="
                                        index1 > 0
                                          ? 'border-t border-white'
                                          : ''
                                      "
                                    >
                                      <div class="w-48 pl-4 py-2 flex">
                                        <div class="flex-grow">
                                          {{ day.parent }}
                                        </div>
                                        <div
                                          class="
                                            bg-red-700
                                            w-5
                                            h-5
                                            rounded-full
                                            mr-2
                                            pt-0
                                            text-center text-white text-sm
                                          "
                                        >
                                          {{
                                            getLogonsCount({
                                              year: logon.parent,
                                              month: date.parent,
                                              dayInt: day.parent,
                                            })
                                          }}
                                        </div>
                                      </div>
                                    </div>
                                    <div class="flex-grow bg-blue-100 pb-2">
                                      <div
                                        v-for="(time, index2) in day.children"
                                        :key="index2"
                                        class=""
                                        :class="
                                          index1 > 0
                                            ? 'border-t border-white'
                                            : ''
                                        "
                                      >
                                        <div
                                          class="px-6"
                                          :class="
                                            index2 > 0 ? 'pt-1 pb-2' : 'pt-2'
                                          "
                                        >
                                          {{ getTime(time.logonDateTime) }}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <!-- Loading... -->
                  <ContentLoader
                    viewBox="0 0 250 110"
                    :speed="1.2"
                    primaryColor="#c2e0fe"
                    secondaryColor="#eeeeed"
                  >
                    <rect x="0" y="4" rx="3" ry="3" height="4" class="w-full" />
                    <rect
                      x="0"
                      y="12"
                      rx="3"
                      ry="3"
                      height="4"
                      class="w-9/12"
                    />
                    <rect
                      x="0"
                      y="22"
                      rx="3"
                      ry="3"
                      height="4"
                      class="w-full"
                    />
                    <rect
                      x="0"
                      y="30"
                      rx="3"
                      ry="3"
                      height="4"
                      class="w-9/12"
                    />
                    <rect
                      x="0"
                      y="40"
                      rx="3"
                      ry="3"
                      class="w-full"
                      height="4"
                    />
                    <rect
                      x="0"
                      y="48"
                      rx="3"
                      ry="3"
                      height="4"
                      class="w-9/12"
                    />
                  </ContentLoader>
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
  loaded: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object,
  },
};
import _ from "lodash";
import { ref, watch } from "vue";
import formatDateMixin from "../Mixins/formatDate.js";
import { ContentLoader } from "vue-content-loader";
export default {
  name: "ModalDialog",
  props,
  emits: ["closeModel"],
  mixins: [formatDateMixin],
  components: { ContentLoader },
  // created() {
  // // this.shapeLogonDates();
  // },
  computed: {
    formattedDate() {
      return this.formatDate(this.date);
    },
  },
  data() {
    return {
      sortOrder: "asc",
      sortItem: "",
      shapedLogons: [],
      shapedDates: [],
      logCounts: [],
      logons: [],
    };
  },
  methods: {
    shapeLogonDates(logons) {
      const logonsFlattened = _.map(logons, (x) => ({
        id: x.id,
        logonDateTime: x.logonDateTime,
        year: this.getYear(x.logonDateTime),
        month: this.getMonth(x.logonDateTime),
        monthInt: this.getMonthInt(x.logonDateTime),
        day: this.getDay(x.logonDateTime),
        dayInt:
          this.getDay(x.logonDateTime) + "  " + this.getDayInt(x.logonDateTime),
      }));
      var grouped = _.chain(logonsFlattened)
        .orderBy((x) => x.monthInt)
        .groupBy("year")
        .map((objs, parent) => ({ parent, objs }))
        .value();

      // const grouped = _.groupBy(log, "year");
      this.shapedLogons = grouped;
      this.logons = logonsFlattened;
      this.logCounts.push(grouped.length);
      return grouped;
    },
    shapedChildren(dates, period) {
      var grouped = _.chain(dates)
        .groupBy(period)
        .map((children, parent) => ({ parent, children }))
        .value();
      //this.shapedDates = grouped;
      this.logCounts.push(grouped.length);
      return grouped;
    },
    getLogonsCount(obj) {
      return _.filter(this.logons, obj).length;
    },
    sorted(sortItem) {
      return this.sortItem == sortItem && this.sortOrder === "asc";
    },
    sortAz(sortItem) {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      this.sortItem = sortItem;
      this.users = _.orderBy(this.users, [sortItem], [this.sortOrder]);
    },
  },

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
