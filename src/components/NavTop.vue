<template>
  <div>
    <BaseLayout outerClass="bg-gray-700 text-white py-2">
      <!-- <div class="border border-pink-600 w-full">
            fsdfsfjhkhkhkhk hdghdhdhdghdhgdgh
          </div> -->
      <div class="flex flex-nowrap w-full">
        <div class="text-left">
          <span class="pr-1"
            ><font-awesome-icon
              :icon="['fas', 'phone']"
              flip="horizontal"
            /> </span
          ><span class="text-xslg font-bold"> 020 3370 4272 </span>
          <span class="ml-4"
            ><font-awesome-icon :icon="['fas', 'envelope']"
          /></span>
          <span class="px-2 text-xslg font-bold">hello@tagtiv8.com</span>
        </div>
        <div class="flex-auto text-right text-2xl">
          <div>
            <span class="px-1"
              ><font-awesome-icon :icon="['fab', 'facebook-square']"
            /></span>
            <span class="px-1"
              ><font-awesome-icon :icon="['fab', 'twitter']" />
            </span>
            <span class="px-1"
              ><font-awesome-icon :icon="['fab', 'linkedin']"
            /></span>
            <span class="px-1"
              ><font-awesome-icon :icon="['fab', 'vimeo']"
            /></span>
            <span class="px-1"
              ><font-awesome-icon :icon="['fab', 'pinterest-square']"
            /></span>
          </div>
        </div>
      </div>
    </BaseLayout>
  </div>
</template>
