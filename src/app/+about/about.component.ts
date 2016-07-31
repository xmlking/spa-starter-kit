import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'div[app-about]',
  host: { class: 'container' },
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent implements OnInit {
  title = 'About Works!';

  constructor() {}

  ngOnInit() {
  }

}
