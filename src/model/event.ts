export class SlashauthEvent {
  name: string;
  description: string;
  link: string | null;
  dateTime: number;

  constructor(
    name: string,
    description: string,
    link: string | null,
    dateTime: string
  ) {
    this.name = name;
    this.description = description;
    this.link = link;
    try {
      this.dateTime = Date.parse(dateTime);
    } catch (err) {
      console.error('No vaild date time');
    }
  }
}
