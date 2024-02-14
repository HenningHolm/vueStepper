<script setup lang="ts">
import Stepper from './components/Stepper.vue'
import { StepProps, StepState, StepperDirection, StepperProps } from './components/StepperModels';

let steps = [
    {
      icons: ["settings"],
      title: "Step 1",
      description: "This is the first step",
      state: StepState.Aktiv,
    },
    {
      icons: ["settings"],
      title: "Step 2",
      description: "This is the second step",
      state: StepState.IkkePåbegynt,
    },
    {
      icons: ["settings"],
      title: "Step 3",
      description: "This is the third step",
      state: StepState.IkkePåbegynt,
    },
    {
      icons: ["settings"],
      title: "Step 4",
      description: "This is the fourth step",
      state: StepState.IkkePåbegynt,
    },
    {
      icons: ["settings"],
      title: "Step 5",
      description: "This is the fourth step",
      state: StepState.IkkePåbegynt,
    },
  ] as StepProps[];

  let stepperProps = {
    selectedStep: 0,
    direction: StepperDirection.Horisontal,
  } as StepperProps;
</script>

<template>

  <Stepper :stepperProps="stepperProps" :steps="steps" />
</template>

<style scoped>

</style>
