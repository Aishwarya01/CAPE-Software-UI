import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateAgo' })

export class DateAgoPipe implements PipeTransform  {

  transform(d: any): string | undefined{
    var result:string;
    let now = new Date().getTime();

    // time since message was sent in seconds
    let delta = (now - new Date(d).getTime()) / 1000;

    // format string
    if (delta < 10)
    {
        result = 'jetzt';
    }
    else if (delta < 60)
    { // sent in last minute
        result = Math.floor(delta) + ' seconds' + ' ' + 'ago ';
    }
    else if (delta < 3600)
    { // sent in last hour
        result = Math.floor(delta / 60) + ' minutes' + ' ' + 'ago ' ;
    }
    else if (delta < 86400)
    { // sent on last day
        result = Math.floor(delta / 3600) + ' hour' + ' ' + 'ago ';
    }
    else
    { // sent more than one day ago
        result = Math.floor(delta / 86400) + ' day' + ' ' + 'ago ';
    }
    return result;
  }
}
