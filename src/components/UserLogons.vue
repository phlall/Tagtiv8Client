<template>
  <div v-if="loaded">
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
                h-5
                rounded-full
                mr-2
                pt-0
                px-1.5
                text-center text-white text-sm
              "
            >
              {{ getLogonsCount({ year: logon.parent }) }}
            </div>
          </div>
          <div class="flex-grow bg-blue-100">
            <div
              v-for="(date, index) in shapedChildren(logon.objs, 'month')"
              :key="index"
            >
              <div class="flex">
                <div
                  class="w-48"
                  :class="index > 0 ? 'border-t-2 border-blue-300' : ''"
                >
                  <div class="pl-4 pt-2 flex">
                    <div class="flex-grow">{{ date.parent }}</div>
                    <div
                      class="
                        bg-red-700
                        px-1.5
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
                  :class="index > 0 ? 'border-t-2 border-blue-300' : ''"
                >
                  <div
                    v-for="(day, index1) in shapedChildren(
                      date.children,
                      'dayInt'
                    )"
                    :key="index1"
                    :class="index1 > 0 ? 'border-t border-white' : ''"
                  >
                    <UserLogonDatePart
                      :day="day"
                      :logonsCount="
                        getLogonsCount({
                          year: logon.parent,
                          month: date.parent,
                          dayInt: day.parent,
                        })
                      "
                    />
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
      <rect x="0" y="12" rx="3" ry="3" height="4" class="w-9/12" />
      <rect x="0" y="22" rx="3" ry="3" height="4" class="w-full" />
      <rect x="0" y="30" rx="3" ry="3" height="4" class="w-9/12" />
      <rect x="0" y="40" rx="3" ry="3" class="w-full" height="4" />
      <rect x="0" y="48" rx="3" ry="3" height="4" class="w-9/12" />
    </ContentLoader>
  </div>
</template>
<script>
// const props = {
//   user: {
//     type: Object,
//   },
// };
import _ from "lodash";
import formatDateMixin from "../Mixins/formatDate.js";
import UserLogonDatePart from "../components/UserLogonDatePart.vue";
import { ContentLoader } from "vue-content-loader";
export default {
  name: "UserLogons",
  props: {
    userId: Number,
  },
  mixins: [formatDateMixin],
  components: { ContentLoader, UserLogonDatePart },
  computed: {
    formattedDate() {
      return this.formatDate(this.date);
    },
  },
  data() {
    return {
      user: {},
      sortOrder: "asc",
      sortItem: "",
      shapedLogons: [],
      shapedDates: [],
      logCounts: [],
      logons: [],
      open: false,
      loaded: false,
    };
  },
  created() {
    this.loaded = false;
    this.getUserDetail();
  },
  methods: {
    getUserDetail() {
      // this.showDetailModal = true;
      this.$store
        .dispatch("user/getUser", this.userId)
        .then((user) => {
          this.user = user;
          this.loaded = true;
        })
        .catch(() => {
          this.$router.push("Home");
        });
    },
    checkUser() {
      return _.isEmpty(this.user);
    },
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
};
</script>
