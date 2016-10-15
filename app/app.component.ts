import {Component} from '@angular/core';
import {ConfirmationService, Message} from "primeng/components/common/api";

@Component({
    selector: 'app',
    template: `<h1>Hello from PrimeNG!</h1>
               <input type="text" pInputText placeholder="Enter your name"
               (change)="onChangeEvent($event)" />
               <button pButton type="text" 
                    (click)="greetMe()" icon="fa-check" label="Greet me"></button>

               <p> {{theUserSaid}}
               
               <p-confirmDialog width="400"></p-confirmDialog>     
              `,
    providers:  [ConfirmationService]
})
export class AppComponent {
    name: string;
    userResponse: Message[]=[];
    theUserSaid: string;

    constructor(private confirmationService: ConfirmationService) {}

    onChangeEvent({target}){
        this.name = target.value;
        console.log(this.name);
    }

    greetMe(){

        this.confirmationService.confirm({
            message: ` Hey ${this.name}, do you like PrimeNG?`,
            header: 'Greeting',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.userResponse = [];
                this.userResponse.push({severity:'info', summary:'Confirmed', detail:'I like PrimeNG'});
                this.theUserSaid = this.name + " responded " + this.userResponse[0].detail;
            },
            reject: () => {
                this.userResponse = [];
                this.userResponse.push({severity:'info', summary:'Rejected', detail:'I don\'t really like PrimeNG'});
                this.theUserSaid = this.name + " responded " + this.userResponse[0].detail;
            }
        });
    }
}