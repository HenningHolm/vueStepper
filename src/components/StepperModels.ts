
export interface StepProps{
    icons: string[];
    title: string;
    description: string;
    state: StepState;
    selected: boolean;
}

export interface StepperProps{
    selectedStep: number;
    direction: StepperDirection;
}

export interface StepperData{
    stepperProps: StepperProps;
    steps: StepProps[];
}
    
export enum StepState{
    IkkePåbegynt = 0,
    Aktiv = 1, 
    Fullført = 2,
    Feilet = 10,
}


export enum StepperDirection{
    Vertical,
    Horisontal
}