import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'portafolio-app';
  constructor(private renderer: Renderer2) { }
  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'background-color', '#fff');
  }
}
