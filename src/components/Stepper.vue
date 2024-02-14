<template>
  <div class="stepper" :class="stepperProps?.direction">
    <button @click="prevStep">Prev</button>
    <div class="scroll-menu" ref="scrollContainer">
      <a class="scroll-button prev" @click="scrollLeft" :class="{ hidden: atStart }">&#10094;</a>
      <div class="flex-container">
        <Step
          v-for="(step, index) in steps"
          :key="step.title"
          :step="step"
          :isLast="index === steps.length - 1"
          :index="index"
          :direction="stepperProps?.direction"
          @clicked="selectStep"
        />
      </div>
      <a class="scroll-button next" @click="scrollRight" :class="{ hidden: atEnd }">&#10095;</a>
    </div>
    <button @click="nextStep">Next</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Step from './Step.vue';
import { StepState, StepperProps, StepProps } from './StepperModels';

// Props
const props = defineProps({
  stepperProps: Object as () => StepperProps,
  steps: Array as () => StepProps[]
});

const scrollContainer = ref(null);
const atStart = ref(true);
const atEnd = ref(true);
const stepWidth = 100; 

// Check for overflow
function checkOverflow() {
  const totalStepsWidth = props.steps.length * stepWidth;
  const containerWidth = scrollContainer.value.clientWidth;
  atStart.value = scrollContainer.value.scrollLeft <= 0;
  atEnd.value = totalStepsWidth <= containerWidth;
}

onMounted(() => {
  checkOverflow();
});

watch(() => props.stepperProps.selectedStep, () => {
  scrollToSelectedStep();
  checkOverflow();
});

// Step functions
function setStep(index) {
  // Update stepperProps.selectedStep here
  // Remember to handle reactivity properly in Vue
}

function nextStep() {
  if (props.stepperProps.selectedStep < props.steps.length - 1) {
    setStep(props.stepperProps.selectedStep + 1);
    scrollContainer.value.scrollBy({ left: stepWidth, behavior: 'smooth' });
  }
}

function prevStep() {
  if (props.stepperProps.selectedStep > 0) {
    setStep(props.stepperProps.selectedStep - 1);
    scrollContainer.value.scrollBy({ left: -stepWidth, behavior: 'smooth' });
  }
}

function scrollLeft() {
  if (scrollContainer.value.scrollLeft <= 0) {
    atStart.value = true;
    return;
  }
  scrollContainer.value.scrollBy({ left: -stepWidth, behavior: 'smooth' });
  atStart.value = false;
  atEnd.value = false;
}

function scrollRight() {
  if (scrollContainer.value.scrollLeft >= scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth) {
    atEnd.value = true;
    return;
  }
  scrollContainer.value.scrollBy({ left: stepWidth, behavior: 'smooth' });
  atEnd.value = false;
  atStart.value = false;
}

function scrollToSelectedStep() {
  const selectedStepLeft = stepWidth * props.stepperProps.selectedStep;
  scrollContainer.value.scrollLeft = selectedStepLeft;
}

function selectStep(event) {
  setStep(event.detail.index);
}
</script>

<style scoped>

    
.stepper {
  display: flex;
  position: relative;
  overflow: hidden; /* Sørger for at innhold som går ut over ikke vises */
}

a{
cursor: pointer;
user-select: none;
}
.step {
  height: 200px;
}
button{
  margin:  20px;
  z-index:2;
  user-select: none;
}

.scroll-menu {
display: flex;
align-items: center;
overflow-x: hidden;

}

.flex-container {
  display: flex;
  padding: 20px;
  position: relative;
  
}
.hidden {
visibility: hidden;
pointer-events: none; 
}

.scroll-button.prev {
  background: linear-gradient(to right, #ffffff, #ffffff 60%, transparent 100%);
  padding: 80px;
  position: absolute;
  z-index:1;
  left:0;
}
.scroll-button.next {
  background: linear-gradient(to left, #ffffff, #ffffff 60%, transparent 100%);
  padding: 80px;
  position: absolute;
  z-index: 1;
  right: 0;
}

</style> 