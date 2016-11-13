import {Component, ViewChild, Input, Output, EventEmitter} from "@angular/core";
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";


@Component({
    selector : 'modal-biography',
    templateUrl: './ModalBiography.component.html',
    styleUrls: ['./ModalBiography.component.scss']
})


export class ModalBiographyComponent {
    @ViewChild('staticModal') public modal: ModalDirective;
    @Input() set character(char:{key:any}){
        this._character = char;
        if (this._character) {
            this.modal.show();
        }
    };
    @Output() modalOnHide = new EventEmitter();

    private _character:{key:any};
    get character(){ return this._character };

    constructor(){

    }

    emitModalOnHide(){
       this.modalOnHide.emit();
    }

}
