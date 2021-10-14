<template>
  <div>
    <BaseLayout outerClass="bg-gray-700 text-white py-2">
      <div class="grid md:grid-cols-2 w-full font-roboto">
        <div class="md:text-left text-center">
          <span class="pr-1"
            ><font-awesome-icon
              :icon="['fas', 'phone']"
              flip="horizontal"
            /> </span
          ><span class="text-xslg font-bold"
            ><a href="tel:020 3370 4272">020 3370 4272</a>
          </span>
          <span class="ml-4"
            ><font-awesome-icon :icon="['fas', 'envelope']"
          /></span>
          <span class="px-2 text-xslg font-bold"
            ><a href="mailto:hello@tagtiv8.com">hello@tagtiv8.com</a></span
          >
        </div>
        <div class="md:text-right text-center text-2xl">
          <div>
            <span class="px-1"
              ><a
                href="https://www.facebook.com/pages/Tagtiv8-Limited/167224936802574?fref=ts"
                ><font-awesome-icon :icon="['fab', 'facebook-square']" /></a
            ></span>
            <span class="px-1"
              ><a href="https://twitter.com/Tagtiv8"
                ><font-awesome-icon :icon="['fab', 'twitter']"
              /></a>
            </span>
            <span class="px-1"
              ><a href="https://www.linkedin.com/company/tagtiv8-ltd"
                ><font-awesome-icon :icon="['fab', 'linkedin']" /></a
            ></span>
            <span class="px-1"
              ><a href="https://vimeo.com/tagtiv8"
                ><font-awesome-icon :icon="['fab', 'vimeo']" /></a
            ></span>
            <span class="px-1"
              ><a href="https://vimeo.com/tagtiv8"
                ><font-awesome-icon :icon="['fab', 'instagram-square']" /></a
            ></span>
            <span class="px-1"
              ><a href="https://www.pinterest.co.uk/tagtiv8/"
                ><font-awesome-icon :icon="['fab', 'pinterest-square']" /></a
            ></span>
          </div>
        </div>
      </div>
    </BaseLayout>
  </div>
</template>
