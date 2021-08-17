<template>
  <label
    v-if="label"
    :for="uuid"
    :class="labelClass"
  >
    {{ label }}
  </label>
  <input
    class="field"
    v-bind="{
      ...$attrs,
      onInput: updateValue
    }"
    :id="uuid"
    :value="modelValue"
    :placeholder="placeholder"
    :aria-describedby="error ? `${uuid}-error` : null"
    :aria-invalid="error ? true : false"
    :class="{ error }"
  >
  <BaseErrorMessage
    v-if="error"
    :id="`${uuid}-error`"
  >
    {{ error }}
  </BaseErrorMessage>
</template>

<script>
import SetupFormComponent from '@/features/SetupFormComponent'
import UniqueID from '@/features/UniqueID'

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    labelClass: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  setup (props, context) {
    const { updateValue } = SetupFormComponent(props, context)
    const uuid = UniqueID().getID()

    return {
      updateValue,
      uuid
    }
  }
}
</script>
