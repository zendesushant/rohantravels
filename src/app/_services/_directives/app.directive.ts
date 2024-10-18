import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
    selector:'[closeButton]',
    standalone:true
})
export class CloseButton{
    constructor(private renderer:Renderer2, private eleRef : ElementRef){
    }

     setCloseButtonColor(color:string){
        console.log(color)
        this.renderer.setStyle(this.eleRef.nativeElement,'backgroundColor',color)
    }
}