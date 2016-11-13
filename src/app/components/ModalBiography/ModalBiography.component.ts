import {Component, ViewChild, AfterViewInit, Input} from "@angular/core";
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";

@Component({
    selector : 'modal-biography',
    templateUrl: './ModalBiography.component.html',
    styleUrls: ['./ModalBiography.component.scss']
})


export class ModalBiographyComponent implements AfterViewInit{
    @ViewChild('staticModal') public modal: ModalDirective;

    private _character:{key:any};
    @Input() set character(char:{key:any}){ this._character = char; };
    get character(){ return this._character };


    constructor(){

    }

    ngAfterViewInit(){
        //this.modal.show();
    }


    
}