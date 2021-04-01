import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular'
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Character, Episode, DataResponse } from '../interfaces/data.interface';

const QUERY = gql`
  {
    episodes {
      results {
        name
        episode
      }
    }
    characters {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private episodesSubjext = new BehaviorSubject<Episode[]>(null);
  episodes$ = this.episodesSubjext.asObservable();

  private charactersSubjext = new BehaviorSubject<Character[]>(null);
  characters$ = this.charactersSubjext.asObservable();

  constructor(private apollo: Apollo) {
    this.getDataAPI();
  }
  
  private getDataAPI(): void {
    this.apollo.watchQuery<DataResponse>({
      query: QUERY
    }).valueChanges.pipe(
      take(1),
      tap(({ data }) => {
        const { characters, episodes } = data;
        this.episodesSubjext.next(episodes.results);
        this.charactersSubjext.next(characters.results);
      })
    ).subscribe();
  }
}
