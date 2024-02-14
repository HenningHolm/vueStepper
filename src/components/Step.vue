<template>
    <div class="step">
      <span
        @click="emitClicked"
        class="material-symbols-sharp"
        :class="{ active: isActive, hasError: hasError }"
      >
        {{ iconForState(step.state) }}
      </span>
      <div v-if="!isLast" class="divider-horizontal" :class="{ 'selectedInterval': step.selected, waiting: waiting }"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, computed, ref, watch } from 'vue';
  import { StepState, StepProps, StepperDirection } from "./StepperModels";
  
  const props = defineProps({
    step: Object as () => StepProps,
    isLast: Boolean,
    index: Number,
    direction: String as () => StepperDirection
  });
  
  const isActive = ref(false);
  const hasError = ref(false);
  const waiting = ref(true);
  
  // En enkel funksjon for å bestemme ikonet basert på trinntilstanden
  const iconForState = (state: StepState): string => {
    isActive.value = false;
    switch (state) {
      case StepState.Aktiv:
        isActive.value = true;
        waiting.value = false;
        return `counter_${props.index + 1}`;
      case StepState.IkkePåbegynt:
        return `counter_${props.index + 1}`;
      case StepState.Fullført:
        isActive.value = true;
        waiting.value = false;
        return "check_circle";
      case StepState.Feilet:
        isActive.value = true;
        waiting.value = false;
        return "check_circle";
      default:
        return "help_outline";
    }
  };
  
  // Emit funksjon for å sende handlingen til foreldrekomponenten
  const emit = defineEmits(['clicked']);
  const emitClicked = () => {
    emit('clicked', { index: props.index });
  };
  </script>
  

  <style scoped>
  .step {
    position: relative;
    display: flex;
    align-items: center
  }

  .divider-horizontal {
    height: 2px;
    width: 100px;
    background-color: black;
    flex-grow: 1;
  }
  .selectedInterval {
    height: 4px;
  }
  .active{
    font-variation-settings:
    "FILL" 1,
    "wght" 300,
    "GRAD" 1,
    "opsz" 48 !important
  }

  .hasError{
    color: red;
  }
  .sleep{
    color:rgb(184, 184, 184);
  }
  .waiting{
    background-color: rgb(184, 184, 184);
  }
  span{
    cursor: pointer;
  }
  
</style>