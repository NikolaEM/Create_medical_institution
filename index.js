 class Person {

    constructor(name, surName) {
        this.name = name;
        this.surName = surName;
    }
}

class Doctor extends Person {
    

    constructor(name, surName, specialty) {
        super(name, surName);
        this.specialty = specialty
    }

    scheduleAnAppointment(examination) {
       
        console.log(`An appointment was made. Examination type is ${examination.type} for patient ${examination.patient.name} ${examination.patient.surName} with doctor ${this.surName}`)
       
    }
}

class Patient extends Person {
    
    constructor(name, surName, jmbg, medicalRecordNumber) {
        super(name, surName)
        this.jmbg = jmbg;
        this.medicalRecordNumber = medicalRecordNumber;
    }

    chooseDoctor(doctor) {
        this.doctor = doctor;
    }
}

class Examination {
  

    constructor(date, time, patient, type) {
        if (this.constructor == Examination) {
            throw new Error("Abstract classes can't be instantiated.");
          }
        
        this.date = date;
        this.time = time;
        this.patient = patient;
        this.type = type;
    }

    doExamination(){
        throw new Error(" Added abstract Method has no implementation");
    };
}

class SugarLevelReview extends Examination {
    value = ''
    timeOfLastMeal = ''
    constructor(date, time, patient) {
        super(date, time, patient, 'sugar level');
    }

    doExamination() {
        console.log( `Do examination for patient ${this.patient.name} ${this.patient.surName} `)
        this.value = 40;
        this.timeOfLastMeal = '08:56';

        console.log(`Review results: value ${this.value}, time of the last meal ${this.timeOfLastMeal} `)
    }
}

class BloodPresureExamination extends Examination {
  upperValue = ''
  bottomValue = ''
  pulse = ''

    constructor(date, time, patient) {
        super(date, time, patient, 'blood presure');
    }

    doExamination() {
        console.log('Blood presure for patient', this.patient)
        console.log(`Do examination for patient ${this.patient.name} ${this.patient.surName} `)
        this.upperValue = 120;
        this.bottomValue = 80;
        this.puls = 60;
        console.log( `Review results: Blood presure is ${this.upperValue}/${this.bottomValue}, pulse is ${this.pulse} `)

    }
}

class CholesterolScreening extends Examination
{
   value = ''
   timeOfLastMeal = ' '

   constructor(date, time, patient)
   {
       super(date, time, patient, 'cholesterol level');
   }

  doExamination()
   {
       console.log(`Do examination of cholesterol for patient ${this.patient.name} ${this.patient.surName} `)

       this.value = 40;
       this.timeOfLastMeal = '08:56';

       console.log(`Review results: value ${this.value}, time of the last meal ${this.timeOfLastMeal} `)
   }
}


let docMilan = new Doctor('Milan', 'Milanovic', 'cardiologist');
let pacDragan = new Patient('Dragan', 'Jovanovic', '023342323', '0005677');
 pacDragan.chooseDoctor(docMilan);
let examination1 = new SugarLevelReview('12-12-2017', '08:00', pacDragan);
 docMilan.scheduleAnAppointment(examination1);
let examination2 = new BloodPresureExamination('12-12-2017', '08:15',pacDragan);
 docMilan.scheduleAnAppointment(examination2);

 examination1.doExamination();
 examination2.doExamination();