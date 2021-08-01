// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace WomensSoccerTypes {
  export interface Competition {
    competition_id: number;
    season_id: number;
    competition_name: string;
    country_name: string;
    season_name: string;
    match_updated: Date;
    match_available: Date;
  }

  interface Match {
    match_id: number;
    competition: Pick<
      Competition,
      'competition_id' | 'competition_name' | 'country_name'
    >;
    season: {
      season_name: string;
      season_id: number;
    };
    match_date: Date;
    kick_off: Date;
  }

  interface Event {
    id: string;
    index: number;
    period: number;
    timestamp: Date;
    minute: number;
    second: number;
    type: {
      id: number;
      name: string;
    };
  }

  interface Lineup {
    team_id: number;
    team_name: string;
    lineup: Player[];
  }

  interface Player {
    player_id: number;
    player_name: string;
    birth_date: Date;
  }
}
