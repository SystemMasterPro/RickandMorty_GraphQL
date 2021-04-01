import { Component, OnInit } from '@angular/core';
import { DataService } from '@shared/services/data.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
  characters = this.data.characters$;
  constructor(private data: DataService) { }

  ngOnInit(): void {
    console.log(this.characters);
    
  }

}
