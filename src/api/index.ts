import { Config } from '../config';
import { SlashauthEvent } from '../model/event';

export class API {
  private readonly _config: Config;
  private readonly _accessToken: string | null;

  constructor(private readonly config: Config, accessToken: string) {
    this._config = config;
    this._accessToken = accessToken;
  }

  public async addEvent(event: SlashauthEvent): Promise<SlashauthEvent> {
    const response = await fetch(this._config.restDomain + '/events', {
      headers: {
        ...this.defaultHeaders(),
        Authorization: `Bearer ${this._accessToken}`,
      },
      method: 'PATCH',
      body: JSON.stringify(event),
    });

    if (response.status > 299 || response.status < 200) {
      console.error('Failed to add event');
    }

    return event;
  }

  public async getEvents(): Promise<SlashauthEvent[]> {
    const response = await fetch(this._config.restDomain + '/events', {
      headers: {
        ...this.defaultHeaders(),
      },
      method: 'GET',
    });

    if (response.status !== 200) {
      console.error('Failed to get events');
      return [] as SlashauthEvent[];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await response.json()).map((elem: Record<string, any>) => {
      return new SlashauthEvent(
        elem.name,
        elem.description,
        elem.link,
        elem.dateTime
      );
    });

    return data;
  }

  private defaultHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Slashauth-Client': this._config.appClientID,
    };
  }
}
